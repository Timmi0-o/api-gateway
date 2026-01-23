import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import { IUsersDataResponse } from '@tourgis/contracts/dist/api-gateway/auth/v1/contracts/user/users-data.contract';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';
import { getUsersFormatResultData } from './utils/format-result-data';

export class GetUsersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    query: {
      select?: string[];
      filter?: string;
      limit?: number;
      offset?: number;
      include?: any;
    },
  ): Promise<IUsersDataResponse> {
    console.log('JSON.parse(query?.include)', JSON.parse(query?.include));

    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          select: query.select ?? undefined,
          filter: query.filter ? JSON.parse(query.filter) : undefined,
          limit: query?.limit ? +query.limit : 25,
          offset: query.offset ?? 0,
          include: query?.include ? JSON.parse(query?.include) : undefined,
        },
        metadata: {
          commonUserId,
        },
      });

      console.log('res', res);

      return getUsersFormatResultData({ data: res });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
