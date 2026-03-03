import { IBaseArrayQuery } from '@application/dtos/geo/query.dto';
import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetTrainStationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IBaseArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse[]> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<Record<string, unknown>, ITrainStationResponse[]>({
        messagePattern: EGeoTransportSubjects.TRAIN_STATION_GET_MANY,
        data: {
          limit: data.limit ?? 25,
          offset: data.offset ?? 0,
          preset: data.preset ?? 'BASE',
          filter: data.filter ? (JSON.parse(data.filter) as Record<string, unknown>) : undefined,
          orderBy: data.orderBy
            ? (JSON.parse(data.orderBy) as Record<string, 'asc' | 'desc'>)
            : undefined,
          include: data.include,
          select: data.select,
        },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
