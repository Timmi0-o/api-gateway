import { IChangeRegisterRequestStatusBodyDto } from '@application/dtos/organization/register-request-change-status.dto';
import { ICreateRegisterRequestDto } from '@application/dtos/organization/register-request-create.dto';
import { IDeleteRegisterRequestsDto } from '@application/dtos/organization/register-request-delete.dto';
import { IUpdateRegisterRequestBodyDto } from '@application/dtos/organization/register-request-update.dto';
import { CreateOrganizationContractsUseCase } from '@application/use-cases/organization-contracts/create/create-organization-contracts.usecase';
import { ApproveRegisterRequestUseCase } from '@application/use-cases/register-requests/approve/approve.usecase';
import { ChangeRegisterRequestStatusUseCase } from '@application/use-cases/register-requests/change-status/change-status.usecase';
import { CreateRegisterRequestUseCase } from '@application/use-cases/register-requests/create/create.usecase';
import { DeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/delete/delete.usecase';
import { GetRegisterRequestsUseCase } from '@application/use-cases/register-requests/get-many/get-many.usecase';
import { GetRegisterRequestUseCase } from '@application/use-cases/register-requests/get-one/get-one.usecase';
import { RejectRegisterRequestUseCase } from '@application/use-cases/register-requests/reject/reject.usecase';
import { SoftDeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/soft-delete/soft-delete.usecase';
import { UpdateRegisterRequestUseCase } from '@application/use-cases/register-requests/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import {} from '@infrastructure/guards/staff-only.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IPaginationMeta } from '@tourgis/contracts';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

@Controller({ path: 'organization/register-requests', version: '1' })
export class RegisterRequestsController {
  constructor(
    private readonly getRegisterRequestUseCase: GetRegisterRequestUseCase,
    private readonly getRegisterRequestsUseCase: GetRegisterRequestsUseCase,
    private readonly createRegisterRequestUseCase: CreateRegisterRequestUseCase,
    private readonly updateRegisterRequestUseCase: UpdateRegisterRequestUseCase,
    private readonly changeRegisterRequestStatusUseCase: ChangeRegisterRequestStatusUseCase,
    private readonly approveRegisterRequestUseCase: ApproveRegisterRequestUseCase,
    private readonly rejectRegisterRequestUseCase: RejectRegisterRequestUseCase,
    private readonly deleteRegisterRequestsUseCase: DeleteRegisterRequestsUseCase,
    private readonly softDeleteRegisterRequestsUseCase: SoftDeleteRegisterRequestsUseCase,
    private readonly createOrganizationContractsUseCase: CreateOrganizationContractsUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query()
    query: {
      preset?: string;
      filter?: string;
      orderBy?: string;
      limit?: number;
      page?: number;
      registerRequestId?: string;
    },
  ): Promise<{ data: IRegisterRequestDto[]; meta: IPaginationMeta }> {
    return this.getRegisterRequestsUseCase.execute({
      data: {
        preset: query.preset,
        filter: query.filter,
        orderBy: query.orderBy,
        limit: query.limit != null ? Number(query.limit) : undefined,
        page: query.page != null ? Number(query.page) : undefined,
        registerRequestId: query.registerRequestId,
      },
      metadata,
    });
  }

  @Get(':registerRequestId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('registerRequestId') registerRequestId: string,
    @Query('preset') preset?: string,
  ): Promise<IRegisterRequestDto> {
    return this.getRegisterRequestUseCase.execute({
      data: { registerRequestId, preset },
      metadata,
    });
  }

  @Post()
  async create(@Body() body: ICreateRegisterRequestDto): Promise<IRegisterRequestDto> {
    return this.createRegisterRequestUseCase.execute(body);
  }

  @Post('upload-contracts')
  @UseGuards(RsaAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10, { limits: { fileSize: 50 * 1024 * 1024 } }))
  async createContracts(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: { registerRequestId: string },
  ): Promise<{ count: number; errors: unknown[] }> {
    return this.createOrganizationContractsUseCase.execute({
      data: { registerRequestId: body.registerRequestId, files },
      metadata,
    });
  }

  @Patch(':registerRequestId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('registerRequestId') registerRequestId: string,
    @Body() body: IUpdateRegisterRequestBodyDto,
  ): Promise<IRegisterRequestDto> {
    return this.updateRegisterRequestUseCase.execute({
      data: { registerRequestId, ...body },
      metadata,
    });
  }

  @Patch(':registerRequestId/status')
  @UseGuards(RsaAuthGuard)
  async changeStatus(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('registerRequestId') registerRequestId: string,
    @Body() body: IChangeRegisterRequestStatusBodyDto,
  ): Promise<IRegisterRequestDto> {
    return this.changeRegisterRequestStatusUseCase.execute({
      data: { registerRequestId, ...body },
      metadata,
    });
  }

  @Post(':registerRequestId/approve')
  @UseGuards(RsaAuthGuard)
  @HttpCode(HttpStatus.OK)
  async approve(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('registerRequestId') registerRequestId: string,
  ): Promise<IRegisterRequestDto> {
    return this.approveRegisterRequestUseCase.execute({
      data: { registerRequestId },
      metadata,
    });
  }

  @Post(':registerRequestId/reject')
  @UseGuards(RsaAuthGuard)
  @HttpCode(HttpStatus.OK)
  async reject(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('registerRequestId') registerRequestId: string,
    @Body() body: { rejectionReason?: string },
  ): Promise<IRegisterRequestDto> {
    return this.rejectRegisterRequestUseCase.execute({
      data: { registerRequestId, rejectionReason: body.rejectionReason },
      metadata,
    });
  }

  @Delete()
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: IDeleteRegisterRequestsDto,
  ): Promise<{ deleted: number }> {
    const deleted = await this.deleteRegisterRequestsUseCase.execute({
      data: { registerRequestIds: body.registerRequestIds },
      metadata,
    });
    return { deleted };
  }

  @Delete('soft')
  @UseGuards(RsaAuthGuard)
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: IDeleteRegisterRequestsDto,
  ): Promise<{ deleted: number }> {
    const deleted = await this.softDeleteRegisterRequestsUseCase.execute({
      data: { registerRequestIds: body.registerRequestIds },
      metadata,
    });
    return { deleted };
  }
}
