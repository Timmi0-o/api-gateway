import { IAddressGetOneQuery } from '@application/dtos/geo/address/get-one-address.dto';
import { ICreateAddressDto } from '@application/dtos/geo/address/create-address.dto';
import { IDeleteAddressDto } from '@application/dtos/geo/address/delete-address.dto';
import { IUpdateAddressDto } from '@application/dtos/geo/address/update-address.dto';
import { IBaseArrayQuery } from '@application/dtos/geo/query.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IListResponse } from '@application/dtos/geo/types';
import { CreateAddressUseCase } from '@application/use-cases/geo/address/create/create.usecase';
import { DeleteAddressUseCase } from '@application/use-cases/geo/address/delete/delete.usecase';
import { GetAddressesUseCase } from '@application/use-cases/geo/address/get-many/get-many.usecase';
import { GetAddressUseCase } from '@application/use-cases/geo/address/get-one/get-one.usecase';
import { UpdateAddressUseCase } from '@application/use-cases/geo/address/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { PublicEndpoint } from '@infrastructure/decorators/public-endpoint.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'geo/addresses', version: '1' })
export class AddressController {
  constructor(
    private readonly getAddressUseCase: GetAddressUseCase,
    private readonly getAddressesUseCase: GetAddressesUseCase,
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
    private readonly deleteAddressUseCase: DeleteAddressUseCase,
  ) {}

  @Get('by-entity')
  @PublicEndpoint()
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IAddressGetOneQuery,
  ): Promise<IAddress> {
    return this.getAddressUseCase.execute({
      data: {
        entityId: query.entityId,
        entityType: query.entityType,
        preset: query.preset as 'MINIMAL' | 'SHORT' | 'BASE' | undefined,
      },
      metadata,
    });
  }

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<IListResponse<IAddress>> {
    return this.getAddressesUseCase.execute({
      data: {
        preset: query.preset as 'MINIMAL' | 'SHORT' | 'BASE' | undefined,
        limit: query.limit ?? 10,
        page: query.page ?? 1,
        filter: query.filter ? (JSON.parse(query.filter) as Record<string, unknown>) : undefined,
        orderBy: query.orderBy
          ? (JSON.parse(query.orderBy) as Record<string, 'asc' | 'desc'>)
          : undefined,
      },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateAddressDto,
  ): Promise<IAddress> {
    return this.createAddressUseCase.execute({ data, metadata });
  }

  @Patch()
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: IUpdateAddressDto,
  ): Promise<IAddress> {
    return this.updateAddressUseCase.execute({ data, metadata });
  }

  @Delete()
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: IDeleteAddressDto,
  ): Promise<IAddress> {
    return this.deleteAddressUseCase.execute({ data, metadata });
  }
}
