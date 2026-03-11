import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetWharvesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IWharfResponse[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, IWharfResponse[]>({
      messagePattern: EGeoTransportSubjects.WHARF_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
