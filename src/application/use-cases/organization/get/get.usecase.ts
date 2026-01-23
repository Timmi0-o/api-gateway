import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    query: { select?: string[]; filter?: string; limit?: number; offset?: number },
  ): Promise<IOrganizationsDataResponse> {
    console.log('query', query);
    try {
      const res = await this.clientProxy.send<unknown, IQueryOrganizationsDataResponse>({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_MANY,
        data: {
          select: query.select ?? undefined,
          filter: query.filter ? JSON.parse(query.filter) : undefined,
          limit: query?.limit ? +query.limit : 25,
          offset: query.offset ?? 0,
        },
        metadata: {
          commonUserId,
        },
      });

      // return getOrganizationsFormatResultData({ data: res });
      return res as unknown as IOrganizationsDataResponse;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
