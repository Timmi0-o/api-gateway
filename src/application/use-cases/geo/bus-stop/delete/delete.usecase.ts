import { IDeleteBusStopDto } from '@application/dtos/geo/bus-stop/delete-bus-stop.dto';
import { IBusStopResponse } from '@application/dtos/geo/response/bus-stop.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class DeleteBusStopUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteBusStopDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IBusStopResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IDeleteBusStopDto, IBusStopResponse>({
    messagePattern: EGeoTransportSubjects.BUS_STOP_DELETE,
    data,
    metadata,
    })
  }
}
