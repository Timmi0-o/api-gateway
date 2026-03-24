import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { splitArrayQueryParams } from '@shared/utils/split-array-query-params';
import { EAuthSubjects } from '@tourgis/common';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

export class GetUsersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IQueryAuthUsersDataResponse> {
    const { data: query, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(query);

    const res = await this.clientProxy.send<unknown, IQueryAuthUsersDataResponse>({
      messagePattern: EAuthSubjects.GET_USERS,
      data: normalizedQuery,
      metadata,
    });

    return res;
  }
}
