import {
  ICreatePropertyAccessPermissionsDto,
  ISoftDeletePropertyAccessPermissionsDto,
  IUpdatePropertyAccessPermissionDto,
} from '@application/dtos/booking/property-access-permission.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { CreatePropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/create-many/create-many.usecase';
import { GetPropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/get-many/get-many.usecase';
import { GetPropertyAccessPermissionUseCase } from '@application/use-cases/booking/property-access-permissions/get-one/get-one.usecase';
import { SoftDeletePropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/soft-delete-many/soft-delete-many.usecase';
import { UpdatePropertyAccessPermissionUseCase } from '@application/use-cases/booking/property-access-permissions/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

@Controller({
  path: 'organization/:organizationId/booking/property-access-permissions',
  version: '1',
})
@UseGuards(RsaAuthGuard)
export class PropertyAccessPermissionsController {
  constructor(
    private readonly getPropertyAccessPermissionsUseCase: GetPropertyAccessPermissionsUseCase,
    private readonly getPropertyAccessPermissionUseCase: GetPropertyAccessPermissionUseCase,
    private readonly createPropertyAccessPermissionsUseCase: CreatePropertyAccessPermissionsUseCase,
    private readonly updatePropertyAccessPermissionUseCase: UpdatePropertyAccessPermissionUseCase,
    private readonly softDeletePropertyAccessPermissionsUseCase: SoftDeletePropertyAccessPermissionsUseCase,
  ) {}

  @Get()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getPropertyAccessPermissionsUseCase.execute({
      data: { organizationId, ...query },
      metadata,
    });
  }

  @Get(':id')
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') propertyAccessPermissionId: string,
    @Query() query: IBaseQuery,
  ): Promise<unknown> {
    return this.getPropertyAccessPermissionUseCase.execute({
      data: { organizationId, propertyAccessPermissionId, ...query },
      metadata,
    });
  }

  @Post()
  async createMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ICreatePropertyAccessPermissionsDto,
  ): Promise<unknown> {
    return this.createPropertyAccessPermissionsUseCase.execute({
      data: { organizationId, ...body },
      metadata,
    });
  }

  @Patch(':id')
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('id') propertyAccessPermissionId: string,
    @Body() body: IUpdatePropertyAccessPermissionDto,
  ): Promise<unknown> {
    return this.updatePropertyAccessPermissionUseCase.execute({
      data: { organizationId, propertyAccessPermissionId, ...body },
      metadata,
    });
  }

  @Delete()
  async softDeleteMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: ISoftDeletePropertyAccessPermissionsDto,
  ): Promise<unknown> {
    return this.softDeletePropertyAccessPermissionsUseCase.execute({
      data: { organizationId, ...body },
      metadata,
    });
  }
}
