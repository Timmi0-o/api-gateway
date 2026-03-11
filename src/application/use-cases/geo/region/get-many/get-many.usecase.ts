import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoSubjects } from '@tourgis/common';

export class GetRegionsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IRegionResponse[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, IRegionResponse[]>({
      messagePattern: EGeoSubjects.REGION_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
