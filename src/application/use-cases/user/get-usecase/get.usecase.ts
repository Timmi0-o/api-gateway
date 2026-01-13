import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import { IUsersDataResponse } from '@tourgis/contracts/dist/api-gateway/auth/v1/contracts/user/users-data.contract';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';
import { getUsersFormatResultData } from './utils/format-result-data';

export class GetUsersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(commonUserId: string): Promise<IUsersDataResponse> {
    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          commonUserIds: undefined,
        },
        metadata: {
          commonUserId,
        },
      });

      return getUsersFormatResultData({ data: res });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
