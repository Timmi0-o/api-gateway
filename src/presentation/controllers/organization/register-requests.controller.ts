import { IChangeRegisterRequestStatusBodyDto } from '@application/dtos/organization/register-request-change-status.dto';
import { ICreateRegisterRequestDto } from '@application/dtos/organization/register-request-create.dto';
import { IDeleteRegisterRequestsDto } from '@application/dtos/organization/register-request-delete.dto';
import { IUpdateRegisterRequestBodyDto } from '@application/dtos/organization/register-request-update.dto';
import { ChangeRegisterRequestStatusUseCase } from '@application/use-cases/register-requests/change-status/change-status.usecase';
import { CreateRegisterRequestUseCase } from '@application/use-cases/register-requests/create/create.usecase';
import { DeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/delete/delete.usecase';
import { GetRegisterRequestsUseCase } from '@application/use-cases/register-requests/get-many/get-many.usecase';
import { GetRegisterRequestUseCase } from '@application/use-cases/register-requests/get-one/get-one.usecase';
import { SoftDeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/soft-delete/soft-delete.usecase';
import { UpdateRegisterRequestUseCase } from '@application/use-cases/register-requests/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { StaffOnlyGuard } from '@infrastructure/guards/staff-only.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
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
    private readonly deleteRegisterRequestsUseCase: DeleteRegisterRequestsUseCase,
    private readonly softDeleteRegisterRequestsUseCase: SoftDeleteRegisterRequestsUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard, StaffOnlyGuard)
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
    console.log('query', query);
    console.log('metadata', metadata);

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

  @Patch(':registerRequestId')
  @UseGuards(RsaAuthGuard, StaffOnlyGuard)
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
  @UseGuards(RsaAuthGuard, StaffOnlyGuard)
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

  @Delete()
  @UseGuards(RsaAuthGuard, StaffOnlyGuard)
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
  @UseGuards(RsaAuthGuard, StaffOnlyGuard)
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
