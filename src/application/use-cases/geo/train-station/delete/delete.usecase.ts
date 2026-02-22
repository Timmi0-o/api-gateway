import { IDeleteTrainStationDto } from '@application/dtos/geo/train-station/delete-train-station.dto';
import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class DeleteTrainStationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteTrainStationDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ITrainStationResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<
        IDeleteTrainStationDto,
        ITrainStationResponse
      >({
        messagePattern: EGeoTransportSubjects.TRAIN_STATION_DELETE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
