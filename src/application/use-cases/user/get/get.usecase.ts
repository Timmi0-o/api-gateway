import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

export class GetUsersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    query: {
      select?: string[];
      filter?: string;
      limit?: number;
      offset?: number;
      include?: string;
    },
  ): Promise<IQueryAuthUsersDataResponse> {
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

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
