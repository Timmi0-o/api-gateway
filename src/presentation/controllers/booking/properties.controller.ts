import { ICreatePropertyDto, IUpdatePropertyDto } from '@application/dtos/booking/property.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreatePropertyUseCase } from '@application/use-cases/booking/properties/create/create.usecase';
import { GetPropertiesUseCase } from '@application/use-cases/booking/properties/get-many/get-many.usecase';
import { GetPropertyUseCase } from '@application/use-cases/booking/properties/get-one/get-one.usecase';
import { SoftDeletePropertyUseCase } from '@application/use-cases/booking/properties/soft-delete/soft-delete.usecase';
import { UpdatePropertyUseCase } from '@application/use-cases/booking/properties/update/update.usecase';
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

@Controller({ path: 'organization/:organizationId/booking/properties', version: '1' })
@UseGuards(RsaAuthGuard)
export class PropertiesController {
  constructor(
    private readonly getPropertiesUseCase: GetPropertiesUseCase,
    private readonly getPropertyUseCase: GetPropertyUseCase,
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly softDeletePropertyUseCase: SoftDeletePropertyUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getPropertiesUseCase.execute({ data: { organizationId, ...query }, metadata });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') propertyId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getPropertyUseCase.execute({
      data: { organizationId, propertyId, ...query },
      metadata,
    });
  }

  @Post()
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreatePropertyDto,
  ): Promise<unknown> {
    return this.createPropertyUseCase.execute({ data: { organizationId, ...body }, metadata });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') propertyId: string,
    @Body() body: IUpdatePropertyDto,
  ): Promise<unknown> {
    return this.updatePropertyUseCase.execute({
      data: { organizationId, propertyId, ...body },
      metadata,
    });
  }

  @Delete(':id')
  async softDelete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') propertyId: string,
  ): Promise<unknown> {
    return this.softDeletePropertyUseCase.execute({
      data: { organizationId, propertyId },
      metadata,
    });
  }
}
