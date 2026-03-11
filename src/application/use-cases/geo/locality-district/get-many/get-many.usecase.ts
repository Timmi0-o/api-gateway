import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoSubjects } from '@tourgis/common';

export class GetLocalityDistrictsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, ILocalityDistrictResponse[]>({
      messagePattern: EGeoSubjects.LOCALITY_DISTRICT_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
