import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetMembersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string },
    data: {
      organizationId: string;
      filter?: string;
      limit?: number;
      offset?: number;
      preset: string;
    },
  ): Promise<unknown> {
    console.log('data GetMembersUseCase', data);
    try {
      const res = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_GET_MANY,
        data: {
          organizationId: data.organizationId,
          filter: data.filter ? JSON.parse(data.filter) : undefined,
          limit: data?.limit ? +data.limit : 25,
          offset: data.offset ?? 0,
          preset: data.preset ?? 'MINIMAL',
        },
        metadata: {
          commonUserId: metadata.commonUserId,
        },
      });

      console.log('res', res);

      return res;
    } catch (err) {
      console.log('err', err);
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
