import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';
import { IOrganizationDto } from '@tourgis/contracts/dist/organization/v1';

export class GetOneOrganizationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; systemRole: string; isStaffUser: boolean },
    data: {
      organizationId: string;
      preset: string;
    },
  ): Promise<IOrganizationDto> {
    try {
      const res = await this.clientProxy.send<unknown, IOrganizationDto>({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_ONE,
        data: {
          organizationId: data.organizationId,
          preset: data.preset ?? 'MINIMAL',
        },
        metadata: {
          commonUserId: metadata.commonUserId,
          systemRole: metadata.systemRole,
          isStaffUser: metadata.isStaffUser,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
