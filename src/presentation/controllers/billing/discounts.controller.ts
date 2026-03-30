import { ICreateDiscountBody } from '@application/dtos/billing/discounts/create.dto';
import { IUpdateDiscountBody } from '@application/dtos/billing/discounts/update.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreateDiscountUseCase } from '@application/use-cases/billing/discounts/create.usecase';
import { GetDiscountUseCase } from '@application/use-cases/billing/discounts/get-one.usecase';
import { GetDiscountsUseCase } from '@application/use-cases/billing/discounts/get-many.usecase';
import { SoftDeleteDiscountUseCase } from '@application/use-cases/billing/discounts/soft-delete.usecase';
import { UpdateDiscountUseCase } from '@application/use-cases/billing/discounts/update.usecase';
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

@Controller({ path: 'billing/discounts', version: '1' })
export class BillingDiscountsController {
  constructor(
    private readonly getDiscountsUseCase: GetDiscountsUseCase,
    private readonly getDiscountUseCase: GetDiscountUseCase,
    private readonly createDiscountUseCase: CreateDiscountUseCase,
    private readonly updateDiscountUseCase: UpdateDiscountUseCase,
    private readonly softDeleteDiscountUseCase: SoftDeleteDiscountUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getDiscountsUseCase.execute({ data: query, metadata });
  }

  @Get(':discountId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('discountId') discountId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getDiscountUseCase.execute({ data: { discountId, preset }, metadata });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() body: ICreateDiscountBody,
  ): Promise<unknown> {
    return this.createDiscountUseCase.execute({ data: body, metadata });
  }

  @Patch(':discountId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('discountId') discountId: string,
    @Body() body: IUpdateDiscountBody,
  ): Promise<unknown> {
    return this.updateDiscountUseCase.execute({ data: { ...body, discountId }, metadata });
  }

  @Delete(':discountId')
  @UseGuards(RsaAuthGuard)
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('discountId') discountId: string,
  ): Promise<unknown> {
    return this.softDeleteDiscountUseCase.execute({ data: { discountId }, metadata });
  }
}
