import { IDeleteCountryDto } from '@application/dtos/geo/country/delete-country.dto';
import { ICountryResponse } from '@application/dtos/geo/response/country.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class DeleteCountryUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteCountryDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ICountryResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IDeleteCountryDto, ICountryResponse>({
        messagePattern: EGeoSubjects.COUNTRY_DELETE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
