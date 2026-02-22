import { ICreateAirportDto } from '@application/dtos/geo/airport/create-airport.dto';
import { IAirportResponse } from '@application/dtos/geo/response/airport.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class CreateAirportUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateAirportDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IAirportResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<ICreateAirportDto, IAirportResponse>({
        messagePattern: EGeoTransportSubjects.AIRPORT_CREATE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
