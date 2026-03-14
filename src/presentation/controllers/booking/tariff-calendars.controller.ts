import {
  ICreateTariffCalendarDto,
  IUpdateTariffCalendarDto,
} from '@application/dtos/booking/tariff-calendar.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/create/create.usecase';
import { DeleteTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/delete/delete.usecase';
import { GetTariffCalendarsUseCase } from '@application/use-cases/booking/tariff-calendars/get-many/get-many.usecase';
import { GetTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/get-one/get-one.usecase';
import { UpdateTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/booking/tariff-calendars', version: '1' })
@UseGuards(RsaAuthGuard)
export class TariffCalendarsController {
  constructor(
    private readonly getTariffCalendarsUseCase: GetTariffCalendarsUseCase,
    private readonly getTariffCalendarUseCase: GetTariffCalendarUseCase,
    private readonly createTariffCalendarUseCase: CreateTariffCalendarUseCase,
    private readonly updateTariffCalendarUseCase: UpdateTariffCalendarUseCase,
    private readonly deleteTariffCalendarUseCase: DeleteTariffCalendarUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getTariffCalendarsUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffCalendarId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getTariffCalendarUseCase.execute({
      data: { organizationId, tariffCalendarId, ...query },
      metadata,
    });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateTariffCalendarDto,
  ): Promise<unknown> {
    return this.createTariffCalendarUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffCalendarId: string,
    @Body() body: IUpdateTariffCalendarDto,
  ): Promise<unknown> {
    return this.updateTariffCalendarUseCase.execute({
      data: { organizationId, tariffCalendarId, ...body },
      metadata,
    });
  }

  @Delete(':id')
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') tariffCalendarId: string,
  ): Promise<unknown> {
    return this.deleteTariffCalendarUseCase.execute({
      data: { organizationId, tariffCalendarId },
      metadata,
    });
  }
}
