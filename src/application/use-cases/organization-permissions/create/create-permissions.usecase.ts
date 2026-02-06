import { ICreateRolePermissionsDto } from '@application/dtos/organization/role-permission-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateRolePermissionsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: ICreateRolePermissionsDto,
  ): Promise<{ success: boolean }> {
    try {
      await this.clientProxy.send<ICreateRolePermissionsDto, void>({
        messagePattern: EOrganizationSubjects.ROLE_PERMISSION_CREATE,
        data,
        metadata: metadata,
      });

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
