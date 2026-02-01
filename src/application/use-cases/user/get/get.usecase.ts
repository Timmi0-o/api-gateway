import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

export class GetUsersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    query: {
      filter?: string;
      limit?: number;
      offset?: number;
      preset: string;
    },
  ): Promise<IQueryAuthUsersDataResponse> {
    console.log('query GetUsersUseCase', query);
    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          preset: query.preset ?? 'MINIMAL',
          filter: query.filter ? JSON.parse(query.filter) : undefined,
          take: query?.limit ? +query.limit : 25,
          skip: query.offset ?? 0,
        },
        metadata: {
          commonUserId,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
