import { IDeleteAirportDto } from '@application/dtos/geo/airport/delete-airport.dto';
import { IAirportResponse } from '@application/dtos/geo/response/airport.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class DeleteAirportUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteAirportDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IAirportResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IDeleteAirportDto, IAirportResponse>({
    messagePattern: EGeoTransportSubjects.AIRPORT_DELETE,
    data,
    metadata,
    })
  }
}
