import { ICreateOrganizationDto } from '@application/dtos/organization/organization-create.dto';
import { IUpdateOrganizationDto } from '@application/dtos/organization/organization-update.dto';
import { CreateOrganizationUseCase } from '@application/use-cases/organization/create/create.usecase';
import { GetOneOrganizationUseCase } from '@application/use-cases/organization/get-one/get-one.usecase';
import { GetOrganizationsUseCase } from '@application/use-cases/organization/get/get.usecase';
import { UpdateOrganizationUseCase } from '@application/use-cases/organization/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Permissions } from '@tourgis/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IOrganizationDto } from '@tourgis/contracts/dist/organization/v1';

@Controller({ path: 'organization', version: '1' })
export class OrganizationController {
  constructor(
    private readonly getOrganizationsUsecase: GetOrganizationsUseCase,
    private readonly getOneOrganizationUsecase: GetOneOrganizationUseCase,
    private readonly updateOrganizationUsecase: UpdateOrganizationUseCase,
    private readonly createOrganizationUsecase: CreateOrganizationUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(
    Permissions.organization.read,
    Permissions.organization.create,
    Permissions.organization.update,
    Permissions.organization.delete,
  )
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query()
    query: { filter?: string; limit?: number; page?: number; preset: 'string' },
  ): Promise<IOrganizationsDataResponse> {
    const formatQuery = {
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.page ? { page: query.page } : {}),
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
    };
    return this.getOrganizationsUsecase.execute({ data: formatQuery, metadata });
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.organization.read)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') organizationId: string,
    @Query() query: { select?: string; include?: string; preset: string },
  ): Promise<IOrganizationDto> {
    const formatQuery = {
      organizationId,
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
    };
    return this.getOneOrganizationUsecase.execute({ data: formatQuery, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.organization.update)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') organizationId: string,
    @Body() data: IUpdateOrganizationDto,
  ): Promise<{ success: boolean }> {
    await this.updateOrganizationUsecase.execute({ data: { organizationId, ...data }, metadata });

    return { success: true };
  }

  @Post()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.organization.create)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateOrganizationDto,
  ): Promise<boolean> {
    return this.createOrganizationUsecase.execute({ data, metadata });
  }
}
