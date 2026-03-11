import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ILocalityResponse } from '@application/dtos/geo/response/locality.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoSubjects } from '@tourgis/common';

export class GetLocalitiesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityResponse[]> {
    const { data, metadata } = params;
    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, ILocalityResponse[]>({
      messagePattern: EGeoSubjects.LOCALITY_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
