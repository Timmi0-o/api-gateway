import { ICreateOrganizationTariffLineBody } from '@application/dtos/billing/organization-tariff-lines/create.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateOrganizationTariffLineUseCase } from '@application/use-cases/billing/organization-tariff-lines/create.usecase';
import { GetOrganizationTariffLineUseCase } from '@application/use-cases/billing/organization-tariff-lines/get-one.usecase';
import { GetOrganizationTariffLinesUseCase } from '@application/use-cases/billing/organization-tariff-lines/get-many.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'billing/organization-tariff-lines', version: '1' })
export class BillingOrganizationTariffLinesController {
  constructor(
    private readonly getOrganizationTariffLinesUseCase: GetOrganizationTariffLinesUseCase,
    private readonly getOrganizationTariffLineUseCase: GetOrganizationTariffLineUseCase,
    private readonly createOrganizationTariffLineUseCase: CreateOrganizationTariffLineUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getOrganizationTariffLinesUseCase.execute({ data: query, metadata });
  }

  @Get(':organizationTariffLineId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationTariffLineId') organizationTariffLineId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOrganizationTariffLineUseCase.execute({
      data: { organizationTariffLineId, preset },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: ICreateOrganizationTariffLineBody,
  ): Promise<unknown> {
    return this.createOrganizationTariffLineUseCase.execute({ data: body, metadata });
  }
}
