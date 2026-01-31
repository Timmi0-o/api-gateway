import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { CreateRolePermissionsUseCase } from '@application/use-cases/organization-roles/create-permissions/create-permissions.usecase';
import { CreateRoleUseCase } from '@application/use-cases/organization-roles/create/create.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

@Controller({ path: 'organization/:organizationId/role', version: '1' })
export class RoleController {
  constructor(
    private readonly getOrganizationRolesUseCase: GetOrganizationRolesUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly createRolePermissionsUseCase: CreateRolePermissionsUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Query()
    query: {
      select?: string;
      filter?: string;
      limit?: number;
      offset?: number;
      include?: string;
    },
  ): Promise<IRoleMinimalDto[]> {
    const formatQuery = {
      organizationId,
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
      ...(query.include ? { include: query.include } : {}),
    };

    return this.getOrganizationRolesUseCase.execute(commonUserId, formatQuery);
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Body() data: ICreateRoleDto & { permissionIds?: string[] },
  ): Promise<{ success: boolean; roleId: string }> {
    const { permissionIds, ...roleData } = data;
    let roleId: string;

    const existRole = await this.getOrganizationRolesUseCase.execute(commonUserId, {
      organizationId,
      filter: JSON.stringify({ name: roleData.name, organizationId }),
    });

    // @ts-expect-error: any
    if (!existRole || !existRole?.data.find((role) => role.name === roleData.name)) {
      const newRole = await this.createRoleUseCase.execute(commonUserId, {
        ...roleData,
        organizationId,
      });

      roleId = newRole.id;
    } else {
      // @ts-expect-error: any
      roleId = existRole?.data?.find((role) => role.name === roleData.name)?.id;
    }

    if (permissionIds?.length) {
      await this.createRolePermissionsUseCase.execute(commonUserId, {
        roleId,
        organizationId,
        permissionIds,
      });
    }

    return { success: true, roleId };
  }
}
