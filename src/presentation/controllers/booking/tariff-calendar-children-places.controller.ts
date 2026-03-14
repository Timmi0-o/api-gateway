import {
  ICreateTariffCalendarChildrenPlaceDto,
  IUpdateTariffCalendarChildrenPlaceDto,
} from '@application/dtos/booking/tariff-calendar-children-place.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/create/create.usecase';
import { DeleteTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/delete/delete.usecase';
import { GetTariffCalendarChildrenPlacesUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/get-many/get-many.usecase';
import { GetTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/get-one/get-one.usecase';
import { UpdateTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({
  path: 'organization/:organizationId/booking/tariff-calendar-children-places',
  version: '1',
})
@UseGuards(RsaAuthGuard)
export class TariffCalendarChildrenPlacesController {
  constructor(
    private readonly getTariffCalendarChildrenPlacesUseCase: GetTariffCalendarChildrenPlacesUseCase,
    private readonly getTariffCalendarChildrenPlaceUseCase: GetTariffCalendarChildrenPlaceUseCase,
    private readonly createTariffCalendarChildrenPlaceUseCase: CreateTariffCalendarChildrenPlaceUseCase,
    private readonly updateTariffCalendarChildrenPlaceUseCase: UpdateTariffCalendarChildrenPlaceUseCase,
    private readonly deleteTariffCalendarChildrenPlaceUseCase: DeleteTariffCalendarChildrenPlaceUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getTariffCalendarChildrenPlacesUseCase.execute({
      data: { organizationId, ...query },
      metadata,
    });
  }

  @Get(':tariffCalendarId/:childPlaceId')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('childPlaceId') childPlaceId: string,
  ): Promise<unknown> {
    return this.getTariffCalendarChildrenPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, childPlaceId },
      metadata,
    });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreateTariffCalendarChildrenPlaceDto,
  ): Promise<unknown> {
    return this.createTariffCalendarChildrenPlaceUseCase.execute({
      data: { organizationId, ...body },
      metadata,
    });
  }

  @Patch(':tariffCalendarId/:childPlaceId')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('childPlaceId') childPlaceId: string,
    @Body() body: IUpdateTariffCalendarChildrenPlaceDto,
  ): Promise<unknown> {
    return this.updateTariffCalendarChildrenPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, childPlaceId, ...body },
      metadata,
    });
  }

  @Delete(':tariffCalendarId/:childPlaceId')
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('tariffCalendarId') tariffCalendarId: string,
    @Param('childPlaceId') childPlaceId: string,
  ): Promise<unknown> {
    return this.deleteTariffCalendarChildrenPlaceUseCase.execute({
      data: { organizationId, tariffCalendarId, childPlaceId },
      metadata,
    });
  }
}
