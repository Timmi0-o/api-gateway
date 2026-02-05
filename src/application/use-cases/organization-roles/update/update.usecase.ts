import { IUpdateRoleDto } from '@application/dtos/organization/role-update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IUpdateRoleWithPermissionsDto extends IUpdateRoleDto {
  permissions?: {
    added: string[];
    deleted: string[];
  };
}

export class UpdateRoleUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: IUpdateRoleWithPermissionsDto,
  ): Promise<{ success: boolean }> {
    try {
      await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ROLE_UPDATE,
        data: {
          roleId: data.roleId,
          organizationId: data.organizationId,
          name: data.name,
          description: data.description ?? null,
        },
        metadata: { ...metadata },
      });

      if (data.permissions?.added?.length) {
        await this.clientProxy.send({
          messagePattern: EOrganizationSubjects.ROLE_PERMISSION_CREATE,
          data: {
            roleId: data.roleId,
            organizationId: data.organizationId,
            permissionIds: data.permissions.added,
          },
          metadata: { ...metadata },
        });
      }

      if (data.permissions?.deleted?.length) {
        await Promise.all(
          data.permissions.deleted.map((rolePermissionId) =>
            this.clientProxy.send({
              messagePattern: EOrganizationSubjects.ROLE_PERMISSION_DELETE,
              data: {
                organizationId: data.organizationId,
                roleId: data.roleId,
                rolePermissionId,
              },
              metadata: { ...metadata },
            }),
          ),
        );
      }

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
