import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EAuthSubjects } from '@tourgis/common';
import {
  IQueryAuthUsersDataResponse,
  IUserWithOrganizationData,
} from '@tourgis/contracts/dist/auth/v1';

export class GetOneUserUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery & {
      userId: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ result: IUserWithOrganizationData | null }> {
    const { data, metadata } = params;

    const { userId, ...query } = data;

    const normalizedQuery = splitArrayQueryParams(query);

    const res = await this.clientProxy.send<INormalizedArrayQuery, IQueryAuthUsersDataResponse>({
      messagePattern: EAuthSubjects.GET_USERS,
      data: { ...normalizedQuery, filter: { id: userId } },
      metadata,
    });

    return { result: res?.data?.[0] ?? null };
  }
}
