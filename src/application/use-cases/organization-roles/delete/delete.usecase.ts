import { IDeleteRoleDto } from '@application/dtos/organization/role-delete.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class DeleteRoleUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: IDeleteRoleDto,
  ): Promise<{ success: boolean }> {
    try {
      const res = await this.clientProxy.send<IDeleteRoleDto, { success: boolean }>({
        messagePattern: EOrganizationSubjects.ROLE_DELETE,
        data,
        metadata: {
          commonUserId: metadata.commonUserId,
          isStaffUser: metadata.isStaffUser,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
