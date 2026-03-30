import { ICreateServicePricingBody } from '@application/dtos/billing/service-pricings/create.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateServicePricingUseCase } from '@application/use-cases/billing/service-pricings/create.usecase';
import { GetServicePricingUseCase } from '@application/use-cases/billing/service-pricings/get-one.usecase';
import { GetServicePricingsUseCase } from '@application/use-cases/billing/service-pricings/get-many.usecase';
import { SoftDeleteServicePricingUseCase } from '@application/use-cases/billing/service-pricings/soft-delete.usecase';
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
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

@Controller({ path: 'billing/service-pricings', version: '1' })
export class BillingServicePricingsController {
  constructor(
    private readonly getServicePricingsUseCase: GetServicePricingsUseCase,
    private readonly getServicePricingUseCase: GetServicePricingUseCase,
    private readonly createServicePricingUseCase: CreateServicePricingUseCase,
    private readonly softDeleteServicePricingUseCase: SoftDeleteServicePricingUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getServicePricingsUseCase.execute({ data: query, metadata });
  }

  @Get(':servicePricingId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('servicePricingId') servicePricingId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getServicePricingUseCase.execute({ data: { servicePricingId, preset }, metadata });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: ICreateServicePricingBody,
  ): Promise<unknown> {
    return this.createServicePricingUseCase.execute({ data: body, metadata });
  }

  @Delete(':servicePricingId')
  @UseGuards(RsaAuthGuard)
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('servicePricingId') servicePricingId: string,
  ): Promise<unknown> {
    return this.softDeleteServicePricingUseCase.execute({ data: { servicePricingId }, metadata });
  }
}
