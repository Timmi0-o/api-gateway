import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IBusStopResponse } from '@application/dtos/geo/response/bus-stop.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetBusStopsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IBusStopResponse[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, IBusStopResponse[]>({
      messagePattern: EGeoTransportSubjects.BUS_STOP_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
