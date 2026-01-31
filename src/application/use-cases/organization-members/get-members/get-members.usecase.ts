import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetMembersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string },
    data: {
      organizationId: string;
      select?: string[];
      filter?: string;
      limit?: number;
      offset?: number;
    },
  ): Promise<unknown> {
    try {
      const res = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_GET_MANY,
        data: {
          organizationId: data.organizationId,
          select: data.select ?? undefined,
          filter: data.filter ? JSON.parse(data.filter) : undefined,
          limit: data?.limit ? +data.limit : 25,
          offset: data.offset ?? 0,
          include: {
            user: true,
            role: true,
          },
        },
        metadata: {
          commonUserId: metadata.commonUserId,
        },
      });

      return res;
    } catch (err) {
      console.log('err', err);
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
