import { IUpdateDistrictRegionDto } from '@application/dtos/geo/district-region/update-district-region.dto';
import { IDistrictRegionResponse } from '@application/dtos/geo/response/district-region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateDistrictRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateDistrictRegionDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IDistrictRegionResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateDistrictRegionDto, IDistrictRegionResponse>({
    messagePattern: EGeoSubjects.DISTRICT_REGION_UPDATE,
    data,
    metadata,
    })
  }
}
