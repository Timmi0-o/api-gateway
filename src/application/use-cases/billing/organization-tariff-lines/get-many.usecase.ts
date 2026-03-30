import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetOrganizationTariffLinesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<INormalizedArrayQuery, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_ORGANIZATION_TARIFF_LINE_GET_MANY,
      data: splitArrayQueryParams(params.data),
      metadata: params.metadata,
    });
  }
}
