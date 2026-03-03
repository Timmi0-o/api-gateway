import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { IGetTrainStationDto } from '@application/dtos/geo/train-station/get-train-station.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetTrainStationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetTrainStationDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IGetTrainStationDto, ITrainStationResponse>({
    messagePattern: EGeoTransportSubjects.TRAIN_STATION_GET_ONE,
    data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
    metadata,
    })
  }
}
