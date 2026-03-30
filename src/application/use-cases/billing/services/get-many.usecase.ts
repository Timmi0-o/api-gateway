import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetBillingServicesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const normalizedQuery = splitArrayQueryParams(params.data);

    if (normalizedQuery.filter?.search) {
      normalizedQuery.filter.search = {
        value: normalizedQuery.filter.search,
        mode: 'STRICT',
      };
    }

    console.log('normalizedQuery', JSON.stringify(normalizedQuery, null, 2));

    return this.clientProxy.send<INormalizedArrayQuery, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_GET_MANY,
      data: normalizedQuery,
      metadata: params.metadata,
    });
  }
}
