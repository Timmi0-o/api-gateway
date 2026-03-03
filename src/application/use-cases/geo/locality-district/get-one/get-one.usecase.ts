import { IGetLocalityDistrictDto } from '@application/dtos/geo/locality-district/get-locality-district.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class GetLocalityDistrictUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetLocalityDistrictDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IGetLocalityDistrictDto, ILocalityDistrictResponse>({
    messagePattern: EGeoSubjects.LOCALITY_DISTRICT_GET_ONE,
    data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
    metadata,
    })
  }
}
