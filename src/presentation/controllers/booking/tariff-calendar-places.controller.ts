import {
  ICreateTariffCalendarPlaceDto,
  IUpdateTariffCalendarPlaceDto,
} from '@application/dtos/booking/tariff-calendar-place.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/create/create.usecase';
import { DeleteTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/delete/delete.usecase';
import { GetTariffCalendarPlacesUseCase } from '@application/use-cases/booking/tariff-calendar-places/get-many/get-many.usecase';
import { GetTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/get-one/get-one.usecase';
import { UpdateTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/booking/tariff-calendar-places', version: '1' })
@UseGuards(RsaAuthGuard)
export class TariffCalendarPlacesController {
  constructor(
    private readonly getTariffCalendarPlacesUseCase: GetTariffCalendarPlacesUseCase,
    private readonly getTariffCalendarPlaceUseCase: GetTariffCalendarPlaceUseCase,
    private readonly createTariffCalendarPlaceUseCase: CreateTariffCalendarPlaceUseCase,
    private readonly updateTariffCalendarPlaceUseCase: UpdateTariffCalendarPlaceUseCase,
    private readonly deleteTariffCalendarPlaceUseCase: DeleteTariffCalendarPlaceUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getTariffCalendarPlacesUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':tariffCalendarId/:placeId')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('placeId') placeId: string,
  ): Promise<unknown> {
    return this.getTariffCalendarPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, placeId },
      metadata,
    });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateTariffCalendarPlaceDto,
  ): Promise<unknown> {
    return this.createTariffCalendarPlaceUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':tariffCalendarId/:placeId')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('placeId') placeId: string,
    @Body() body: IUpdateTariffCalendarPlaceDto,
  ): Promise<unknown> {
    return this.updateTariffCalendarPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, placeId, ...body },
      metadata,
    });
  }

  @Delete(':tariffCalendarId/:placeId')
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('placeId') placeId: string,
  ): Promise<unknown> {
    return this.deleteTariffCalendarPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, placeId },
      metadata,
    });
  }
}
