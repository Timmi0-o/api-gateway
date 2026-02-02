import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; systemRole: string },
    data: {
      filter?: string;
      limit?: number;
      offset?: number;
      include?: string;
    },
  ): Promise<IOrganizationsDataResponse> {
    console.log('filters', JSON.parse(data?.filter || '{}'));
    try {
      const res = await this.clientProxy.send<unknown, IQueryOrganizationsDataResponse>({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_MANY,
        data: {
          ...data,
          filter: data.filter ? JSON.parse(data.filter) : undefined,
          limit: data?.limit ? +data.limit : 25,
          offset: data.offset ?? 0,
        },
        metadata: {
          commonUserId: metadata.commonUserId,
          systemRole: metadata.systemRole,
        },
      });

      // return getOrganizationsFormatResultData({ data: res });
      return res as unknown as IOrganizationsDataResponse;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
