import { ICreateTariffDto, IUpdateTariffDto } from '@application/dtos/booking/tariff.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateTariffUseCase } from '@application/use-cases/booking/tariffs/create/create.usecase';
import { DeleteTariffUseCase } from '@application/use-cases/booking/tariffs/delete/delete.usecase';
import { GetTariffsUseCase } from '@application/use-cases/booking/tariffs/get-many/get-many.usecase';
import { GetTariffUseCase } from '@application/use-cases/booking/tariffs/get-one/get-one.usecase';
import { UpdateTariffUseCase } from '@application/use-cases/booking/tariffs/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/booking/tariffs', version: '1' })
@UseGuards(RsaAuthGuard)
export class TariffsController {
  constructor(
    private readonly getTariffsUseCase: GetTariffsUseCase,
    private readonly getTariffUseCase: GetTariffUseCase,
    private readonly createTariffUseCase: CreateTariffUseCase,
    private readonly updateTariffUseCase: UpdateTariffUseCase,
    private readonly deleteTariffUseCase: DeleteTariffUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getTariffsUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getTariffUseCase.execute({ data: { organizationId, tariffId, ...query }, metadata });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateTariffDto,
  ): Promise<unknown> {
    return this.createTariffUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffId: string,
    @Body() body: IUpdateTariffDto,
  ): Promise<unknown> {
    return this.updateTariffUseCase.execute({ data: { organizationId, tariffId, ...body }, metadata });
  }

  @Delete(':id')
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffId: string,
  ): Promise<unknown> {
    return this.deleteTariffUseCase.execute({ data: { organizationId, tariffId }, metadata });
  }
}
