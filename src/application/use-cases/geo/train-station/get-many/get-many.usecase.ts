import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetTrainStationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams(data);

    return this.clientProxy.send<INormalizedArrayQuery, ITrainStationResponse[]>({
      messagePattern: EGeoTransportSubjects.TRAIN_STATION_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
