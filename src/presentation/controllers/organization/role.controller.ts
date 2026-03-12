import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { CreateRolePermissionsUseCase } from '@application/use-cases/organization-permissions/create/create-permissions.usecase';
import { DeleteRoleUseCase } from '@application/use-cases/organization-roles/delete/delete.usecase';
import { GetOneOrganizationRoleUseCase } from '@application/use-cases/organization-roles/get-one/get-one.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import {
  IUpdateRoleWithPermissionsDto,
  UpdateRoleUseCase,
} from '@application/use-cases/organization-roles/update/update.usecase';
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
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

@Controller({ path: 'organization/:organizationId/role', version: '1' })
export class RoleController {
  constructor(
    private readonly getOrganizationRolesUseCase: GetOrganizationRolesUseCase,
    private readonly getOneOrganizationRoleUseCase: GetOneOrganizationRoleUseCase,
    private readonly createRolePermissionsUseCase: CreateRolePermissionsUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query()
    query: IRawArrayQuery,
  ): Promise<IRoleMinimalDto[]> {
    return this.getOrganizationRolesUseCase.execute({ data: { organizationId, query }, metadata });
  }

  @Get(':roleId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOneOrganizationRoleUseCase.execute({
      data: { organizationId, roleId, preset },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() data: ICreateRoleDto & { permissionIds?: string[] },
  ): Promise<{ success: boolean; roleId: string }> {
    return this.createRolePermissionsUseCase.execute({
      data: { ...data, organizationId },
      metadata,
    });
  }

  @Patch(':roleId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
    @Body() data: Omit<IUpdateRoleWithPermissionsDto, 'roleId' | 'organizationId'>,
  ): Promise<{ success: boolean }> {
    return this.updateRoleUseCase.execute({
      data: {
        ...data,
        roleId,
        organizationId,
      },
      metadata,
    });
  }

  @Delete(':roleId')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
  ): Promise<{ success: boolean }> {
    return this.deleteRoleUseCase.execute({
      data: { roleId, organizationId },
      metadata,
    });
  }
}
