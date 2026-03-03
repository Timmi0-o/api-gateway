import { IGetCountryDto } from '@application/dtos/geo/country/get-country.dto';
import { ICountryResponse } from '@application/dtos/geo/response/country.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class GetCountryUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetCountryDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ICountryResponse> {
    const { data, metadata } = params;

    return this.clientProxy.send<IGetCountryDto, ICountryResponse>({
      messagePattern: EGeoSubjects.COUNTRY_GET_ONE,
      data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
      metadata,
    });
  }
}
