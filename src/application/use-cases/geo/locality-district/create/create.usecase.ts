import { ICreateLocalityDistrictDto } from '@application/dtos/geo/locality-district/create-locality-district.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class CreateLocalityDistrictUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateLocalityDistrictDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<ICreateLocalityDistrictDto, ILocalityDistrictResponse>({
    messagePattern: EGeoSubjects.LOCALITY_DISTRICT_CREATE,
    data,
    metadata,
    })
  }
}
