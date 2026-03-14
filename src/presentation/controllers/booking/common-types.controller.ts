import {
  ICreateCommonTypeDto,
  IUpdateCommonTypeDto,
} from '@application/dtos/booking/common-type.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateCommonTypeUseCase } from '@application/use-cases/booking/common-types/create/create.usecase';
import { DeleteCommonTypeUseCase } from '@application/use-cases/booking/common-types/delete/delete.usecase';
import { GetCommonTypesUseCase } from '@application/use-cases/booking/common-types/get-many/get-many.usecase';
import { GetCommonTypeUseCase } from '@application/use-cases/booking/common-types/get-one/get-one.usecase';
import { UpdateCommonTypeUseCase } from '@application/use-cases/booking/common-types/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
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

@Controller({ path: 'organization/:organizationId/booking/common-types', version: '1' })
@UseGuards(RsaAuthGuard)
export class CommonTypesController {
  constructor(
    private readonly getCommonTypesUseCase: GetCommonTypesUseCase,
    private readonly getCommonTypeUseCase: GetCommonTypeUseCase,
    private readonly createCommonTypeUseCase: CreateCommonTypeUseCase,
    private readonly updateCommonTypeUseCase: UpdateCommonTypeUseCase,
    private readonly deleteCommonTypeUseCase: DeleteCommonTypeUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getCommonTypesUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') commonTypeId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getCommonTypeUseCase.execute({
      data: { organizationId, commonTypeId, ...query },
      metadata,
    });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateCommonTypeDto,
  ): Promise<unknown> {
    return this.createCommonTypeUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') commonTypeId: string,
    @Body() body: IUpdateCommonTypeDto,
  ): Promise<unknown> {
    return this.updateCommonTypeUseCase.execute({
      data: { organizationId, commonTypeId, ...body },
      metadata,
    });
  }

  @Delete(':id')
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') commonTypeId: string,
  ): Promise<unknown> {
    return this.deleteCommonTypeUseCase.execute({
      data: { organizationId, commonTypeId },
      metadata,
    });
  }
}
