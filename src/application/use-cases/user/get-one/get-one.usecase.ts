import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';
import {
  IQueryAuthUsersDataResponse,
  IUserWithOrganizationData,
} from '@tourgis/contracts/dist/auth/v1';

export class GetOneUserUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      userId: string;
      preset: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ result: IUserWithOrganizationData | null }> {
    const { data, metadata } = params;

    try {
      const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          preset: data.preset ?? 'MINIMAL',
          filter: {
            id: data.userId,
          },
        },
        metadata,
      });

      return { result: res?.data?.[0] ?? null };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
