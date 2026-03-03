import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { ICreateTrainStationDto } from '@application/dtos/geo/train-station/create-train-station.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class CreateTrainStationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateTrainStationDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<ICreateTrainStationDto, ITrainStationResponse>({
    messagePattern: EGeoTransportSubjects.TRAIN_STATION_CREATE,
    data,
    metadata,
    })
  }
}
