import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IEditOrganizationModulesDto {
  added: string[];
  deleted: string[];
}

export class EditOrganizationModulesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: { organizationId: string } & IEditOrganizationModulesDto,
  ): Promise<{ success: boolean }> {
    try {
      if (data.added?.length) {
        await this.clientProxy.send({
          messagePattern: EOrganizationSubjects.ORGANIZATION_MODULE_ADD,
          data: {
            organizationId: data.organizationId,
            modules: data.added,
          },
          metadata: {
            commonUserId: metadata.commonUserId,
            isStaffUser: metadata.isStaffUser,
          },
        });
      }

      if (data.deleted?.length) {
        await this.clientProxy.send({
          messagePattern: EOrganizationSubjects.ORGANIZATION_MODULE_REMOVE,
          data: {
            organizationId: data.organizationId,
            modules: data.deleted,
          },
          metadata: {
            commonUserId: metadata.commonUserId,
            isStaffUser: metadata.isStaffUser,
          },
        });
      }

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
