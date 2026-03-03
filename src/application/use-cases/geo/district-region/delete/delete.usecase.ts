import { IDeleteDistrictRegionDto } from '@application/dtos/geo/district-region/delete-district-region.dto';
import { IDistrictRegionResponse } from '@application/dtos/geo/response/district-region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class DeleteDistrictRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteDistrictRegionDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IDistrictRegionResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IDeleteDistrictRegionDto, IDistrictRegionResponse>({
    messagePattern: EGeoSubjects.DISTRICT_REGION_DELETE,
    data,
    metadata,
    })
  }
}
