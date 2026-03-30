import { ICreateOrganizationTariffBody } from '@application/dtos/billing/organization-tariffs/create.dto';
import { IUpdateOrganizationTariffBody } from '@application/dtos/billing/organization-tariffs/update.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/create.usecase';
import { GetOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/get-one.usecase';
import { GetOrganizationTariffsUseCase } from '@application/use-cases/billing/organization-tariffs/get-many.usecase';
import { SoftDeleteOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/soft-delete.usecase';
import { UpdateOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/update.usecase';
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

@Controller({ path: 'billing/organization-tariffs', version: '1' })
export class BillingOrganizationTariffsController {
  constructor(
    private readonly getOrganizationTariffsUseCase: GetOrganizationTariffsUseCase,
    private readonly getOrganizationTariffUseCase: GetOrganizationTariffUseCase,
    private readonly createOrganizationTariffUseCase: CreateOrganizationTariffUseCase,
    private readonly updateOrganizationTariffUseCase: UpdateOrganizationTariffUseCase,
    private readonly softDeleteOrganizationTariffUseCase: SoftDeleteOrganizationTariffUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getOrganizationTariffsUseCase.execute({ data: query, metadata });
  }

  @Get(':organizationTariffId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationTariffId') organizationTariffId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOrganizationTariffUseCase.execute({
      data: { organizationTariffId, preset },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: ICreateOrganizationTariffBody,
  ): Promise<unknown> {
    return this.createOrganizationTariffUseCase.execute({ data: body, metadata });
  }

  @Patch(':organizationTariffId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationTariffId') organizationTariffId: string,
    @Body() body: IUpdateOrganizationTariffBody,
  ): Promise<unknown> {
    return this.updateOrganizationTariffUseCase.execute({
      data: { ...body, organizationTariffId },
      metadata,
    });
  }

  @Delete(':organizationTariffId')
  @UseGuards(RsaAuthGuard)
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationTariffId') organizationTariffId: string,
  ): Promise<unknown> {
    return this.softDeleteOrganizationTariffUseCase.execute({
      data: { organizationTariffId },
      metadata,
    });
  }
}
