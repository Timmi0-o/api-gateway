import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { ICreateRolePermissionsDto } from '@application/dtos/organization/role-permission-create.dto';
import { CreateRoleUseCase } from '@application/use-cases/organization-roles/create/create.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

export class CreateRolePermissionsUseCase {
  constructor(
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly getOrganizationRolesUseCase: GetOrganizationRolesUseCase,
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  async execute(params: {
    data: ICreateRoleDto & { permissionIds?: string[] };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean; roleId: string }> {
    const { data, metadata } = params;
    const { permissionIds, ...roleData } = data;

    const roleId = await this.resolveOrCreateRoleId(roleData, metadata);

    if (permissionIds?.length) {
      await this.clientProxy.send<ICreateRolePermissionsDto, void>({
        messagePattern: EOrganizationSubjects.ROLE_PERMISSION_CREATE,
        data: { roleId, organizationId: data.organizationId, permissionIds },
        metadata,
      });
    }

    return { success: true, roleId };
  }

  private async resolveOrCreateRoleId(
    roleData: ICreateRoleDto,
    metadata: IMetadataObjectForGrpcRequest,
  ): Promise<string> {
    const query: IRawArrayQuery = {
      preset: 'MINIMAL',
      limit: 1,
      page: 1,
      filter: JSON.stringify({
        name: { value: [roleData.name] },
      }),
    };

    const roles = await this.getOrganizationRolesUseCase.execute({
      data: { organizationId: roleData.organizationId, query },
      metadata,
    });

    const list = Array.isArray(roles)
      ? roles
      : ((roles as { data?: IRoleMinimalDto[] })?.data ?? []);
    const existing = list.find((r: IRoleMinimalDto) => r.name === roleData.name);
    if (existing) return existing.id;

    const newRole = await this.createRoleUseCase.execute({ data: roleData, metadata });
    const created = newRole as { id?: string; data?: { id: string } };

    return created.data?.id ?? created.id ?? '';
  }
}
