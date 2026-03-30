import { ICreateServiceBody } from '@application/dtos/billing/services/create.dto';
import { IDeleteServicesBody } from '@application/dtos/billing/services/delete-many.dto';
import { IUpdateServiceBody } from '@application/dtos/billing/services/update.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateBillingServiceUseCase } from '@application/use-cases/billing/services/create.usecase';
import { DeleteBillingServicesUseCase } from '@application/use-cases/billing/services/delete-many.usecase';
import { GetBillingServicesUseCase } from '@application/use-cases/billing/services/get-many.usecase';
import { GetBillingServiceUseCase } from '@application/use-cases/billing/services/get-one.usecase';
import { UpdateBillingServiceUseCase } from '@application/use-cases/billing/services/update.usecase';
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

@Controller({ path: 'billing/services', version: '1' })
export class BillingServicesController {
  constructor(
    private readonly getBillingServicesUseCase: GetBillingServicesUseCase,
    private readonly getBillingServiceUseCase: GetBillingServiceUseCase,
    private readonly createBillingServiceUseCase: CreateBillingServiceUseCase,
    private readonly updateBillingServiceUseCase: UpdateBillingServiceUseCase,
    private readonly deleteBillingServicesUseCase: DeleteBillingServicesUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getBillingServicesUseCase.execute({ data: query, metadata });
  }

  @Get(':serviceId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('serviceId') serviceId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getBillingServiceUseCase.execute({ data: { serviceId, preset }, metadata });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: ICreateServiceBody,
  ): Promise<unknown> {
    return this.createBillingServiceUseCase.execute({ data: body, metadata });
  }

  @Patch(':serviceId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('serviceId') serviceId: string,
    @Body() body: IUpdateServiceBody,
  ): Promise<unknown> {
    return this.updateBillingServiceUseCase.execute({ data: { ...body, serviceId }, metadata });
  }

  @Delete()
  @UseGuards(RsaAuthGuard)
  async deleteMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: IDeleteServicesBody,
  ): Promise<unknown> {
    return this.deleteBillingServicesUseCase.execute({ data: body, metadata });
  }
}
