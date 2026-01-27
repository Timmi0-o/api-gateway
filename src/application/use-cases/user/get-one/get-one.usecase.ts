import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import { IMergedUserData, IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

export class GetOneUserUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    data: {
      userId: string;
      select?: string[];
      include?: string;
    },
  ): Promise<{ result: IMergedUserData }> {
    console.log('data', data);
    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          select: data.select ?? undefined,
          include: data?.include ? JSON.parse(data?.include) : undefined,
          filter: {
            id: data.userId,
          },
        },
        metadata: {
          commonUserId,
        },
      });

      const resultMapObject = { result: res.data?.[0] };

      return resultMapObject;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
