import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateOrganizationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; systemRole: string },
    data: {
      organizationId: string;
      name?: string;
      description?: string;
      isActive?: boolean;
    },
  ): Promise<boolean> {
    try {
      await this.clientProxy.send<unknown, unknown>({
        messagePattern: EOrganizationSubjects.ORGANIZATION_UPDATE,
        data: {
          organizationId: data.organizationId,
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.description !== undefined ? { description: data.description } : {}),
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
        metadata: {
          commonUserId: metadata.commonUserId,
          systemRole: metadata.systemRole,
        },
      });

      return true;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
