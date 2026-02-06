import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { CreateRolePermissionsUseCase } from '@application/use-cases/organization-permissions/create/create-permissions.usecase';
import { CreateRoleUseCase } from '@application/use-cases/organization-roles/create/create.usecase';
import { DeleteRoleUseCase } from '@application/use-cases/organization-roles/delete/delete.usecase';
import { GetOneOrganizationRoleUseCase } from '@application/use-cases/organization-roles/get-one/get-one.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import {
  IUpdateRoleWithPermissionsDto,
  UpdateRoleUseCase,
} from '@application/use-cases/organization-roles/update/update.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
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
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly createRolePermissionsUseCase: CreateRolePermissionsUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query()
    query: {
      filter?: string;
      limit?: number;
      offset?: number;
      preset: string;
    },
  ): Promise<IRoleMinimalDto[]> {
    const formatQuery = {
      organizationId,
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
    };

    return this.getOrganizationRolesUseCase.execute({ commonUserId, isStaffUser }, formatQuery);
  }

  @Get(':roleId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOneOrganizationRoleUseCase.execute(
      { commonUserId, isStaffUser },
      { organizationId, roleId, preset },
    );
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Body() data: ICreateRoleDto & { permissionIds?: string[] },
  ): Promise<{ success: boolean; roleId: string }> {
    const { permissionIds, ...roleData } = data;
    let roleId: string;

    const existRole = await this.getOrganizationRolesUseCase.execute(
      { commonUserId, isStaffUser },
      {
        organizationId,
        preset: 'MINIMAL',
        filter: JSON.stringify({ name: roleData.name, organizationId }),
      },
    );

    // @ts-expect-error: any
    if (!existRole || !existRole?.data.find((role) => role.name === roleData.name)) {
      const newRole = await this.createRoleUseCase.execute(
        { commonUserId, isStaffUser },
        {
          ...roleData,
          organizationId,
        },
      );

      // @ts-expect-error: any
      roleId = newRole.data.id;
    } else {
      // @ts-expect-error: any
      roleId = existRole?.data?.find((role) => role.name === roleData.name)?.id;
    }

    if (permissionIds?.length) {
      await this.createRolePermissionsUseCase.execute(
        { commonUserId, isStaffUser },
        {
          roleId,
          organizationId,
          permissionIds,
        },
      );
    }

    return { success: true, roleId };
  }

  @Patch(':roleId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Body() data: Omit<IUpdateRoleWithPermissionsDto, 'roleId' | 'organizationId'>,
  ): Promise<{ success: boolean }> {
    return this.updateRoleUseCase.execute(
      { commonUserId, isStaffUser },
      {
        ...data,
        roleId,
        organizationId,
      },
    );
  }

  @Delete(':roleId')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('roleId') roleId: string,
  ): Promise<{ success: boolean }> {
    return this.deleteRoleUseCase.execute(commonUserId, {
      roleId,
      organizationId,
    });
  }
}
