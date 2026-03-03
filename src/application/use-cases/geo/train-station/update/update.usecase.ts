import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { IUpdateTrainStationDto } from '@application/dtos/geo/train-station/update-train-station.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class UpdateTrainStationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateTrainStationDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateTrainStationDto, ITrainStationResponse>({
    messagePattern: EGeoTransportSubjects.TRAIN_STATION_UPDATE,
    data,
    metadata,
    })
  }
}
