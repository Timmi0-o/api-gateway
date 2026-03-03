import { IGetAirportDto } from '@application/dtos/geo/airport/get-airport.dto';
import { IAirportResponse } from '@application/dtos/geo/response/airport.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetAirportUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetAirportDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IAirportResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IGetAirportDto, IAirportResponse>({
    messagePattern: EGeoTransportSubjects.AIRPORT_GET_ONE,
    data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
    metadata,
    })
  }
}
