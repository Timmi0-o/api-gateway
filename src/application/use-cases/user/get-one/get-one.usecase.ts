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
      preset: string;
    },
  ): Promise<{ result: IMergedUserData }> {
    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          preset: data.preset ?? 'MINIMAL',
          filter: {
            id: data.userId,
          },
        },
        metadata: {
          commonUserId,
        },
      });

      if (!res?.data?.[0]) {
        const userByOrganization = await this.clientProxy.send({
          messagePattern: EAuthSubjects.GET_USERS,
          data: {
            preset: data.preset ?? 'SHORT',
            include: {
              organization: {
                preset: data.preset ?? 'SHORT',
                filter: {
                  id: data.userId,
                },
              },
            },
          },
          metadata: {
            commonUserId,
          },
        });

        // @ts-expect-error: any
        if (userByOrganization?.data?.find((item) => item.organization?.id === data.userId)) {
          return {
            // @ts-expect-error: any
            result: userByOrganization.data.find((item) => item.organization?.id === data.userId),
          };
        }
      }

      console.log('res', res);

      const resultMapObject = { result: res?.data?.[0] };

      return resultMapObject;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
