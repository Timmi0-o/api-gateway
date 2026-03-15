import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IOrganizationsDataResponse> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    const res = await this.clientProxy.send<INormalizedArrayQuery, IQueryOrganizationsDataResponse>(
      {
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_MANY,
        data: normalizedQuery,
        metadata,
      },
    );

    return res as unknown as IOrganizationsDataResponse;
  }
}
