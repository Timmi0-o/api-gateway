import { ICreateUnitDto, IUpdateUnitDto } from '@application/dtos/booking/unit.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateUnitUseCase } from '@application/use-cases/booking/units/create/create.usecase';
import { GetUnitsUseCase } from '@application/use-cases/booking/units/get-many/get-many.usecase';
import { GetUnitUseCase } from '@application/use-cases/booking/units/get-one/get-one.usecase';
import { SoftDeleteUnitUseCase } from '@application/use-cases/booking/units/soft-delete/soft-delete.usecase';
import { UpdateUnitUseCase } from '@application/use-cases/booking/units/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/booking/units', version: '1' })
@UseGuards(RsaAuthGuard)
export class UnitsController {
  constructor(
    private readonly getUnitsUseCase: GetUnitsUseCase,
    private readonly getUnitUseCase: GetUnitUseCase,
    private readonly createUnitUseCase: CreateUnitUseCase,
    private readonly updateUnitUseCase: UpdateUnitUseCase,
    private readonly softDeleteUnitUseCase: SoftDeleteUnitUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getUnitsUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') unitId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getUnitUseCase.execute({ data: { organizationId, unitId, ...query }, metadata });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateUnitDto,
  ): Promise<unknown> {
    return this.createUnitUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') unitId: string,
    @Body() body: IUpdateUnitDto,
  ): Promise<unknown> {
    return this.updateUnitUseCase.execute({ data: { organizationId, unitId, ...body }, metadata });
  }

  @Delete(':id')
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') unitId: string,
  ): Promise<unknown> {
    return this.softDeleteUnitUseCase.execute({ data: { organizationId, unitId }, metadata });
  }
}
