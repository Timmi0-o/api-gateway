import { IUpdateCountryDto } from '@application/dtos/geo/country/update-country.dto';
import { ICountryResponse } from '@application/dtos/geo/response/country.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateCountryUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateCountryDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ICountryResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateCountryDto, ICountryResponse>({
    messagePattern: EGeoSubjects.COUNTRY_UPDATE,
    data,
    metadata,
    })
  }
}
