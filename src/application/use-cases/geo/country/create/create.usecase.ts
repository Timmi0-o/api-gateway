import { ICreateCountryDto } from '@application/dtos/geo/country/create-country.dto';
import { ICountryResponse } from '@application/dtos/geo/response/country.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class CreateCountryUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateCountryDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ICountryResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<ICreateCountryDto, ICountryResponse>({
    messagePattern: EGeoSubjects.COUNTRY_CREATE,
    data,
    metadata,
    })
  }
}
