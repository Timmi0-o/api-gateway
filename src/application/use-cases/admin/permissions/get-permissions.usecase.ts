import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetAdminPermissionsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: { preset?: string; limit?: number; offset?: number },
  ): Promise<unknown> {
    try {
      const res = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.PERMISSION_GET_MANY,
        data: {
          preset: data.preset ?? 'MINIMAL',
          limit: data?.limit ? +data.limit : 25,
          offset: data.offset ?? 0,
        },
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
