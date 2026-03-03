import { IGetBusStopDto } from '@application/dtos/geo/bus-stop/get-bus-stop.dto';
import { IBusStopResponse } from '@application/dtos/geo/response/bus-stop.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetBusStopUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetBusStopDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IBusStopResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IGetBusStopDto, IBusStopResponse>({
    messagePattern: EGeoTransportSubjects.BUS_STOP_GET_ONE,
    data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
    metadata,
    })
  }
}
