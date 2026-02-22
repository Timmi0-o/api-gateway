import { ICreateBusStopDto } from '@application/dtos/geo/bus-stop/create-bus-stop.dto';
import { IBusStopResponse } from '@application/dtos/geo/response/bus-stop.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class CreateBusStopUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateBusStopDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IBusStopResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<ICreateBusStopDto, IBusStopResponse>({
        messagePattern: EGeoTransportSubjects.BUS_STOP_CREATE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
