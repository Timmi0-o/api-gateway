import { IUpdateRegionDto } from '@application/dtos/geo/region/update-region.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateRegionDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegionResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateRegionDto, IRegionResponse>({
    messagePattern: EGeoSubjects.REGION_UPDATE,
    data,
    metadata,
    })
  }
}
