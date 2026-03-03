import { ICreateRegionDto } from '@application/dtos/geo/region/create-region.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class CreateRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateRegionDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegionResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<ICreateRegionDto, IRegionResponse>({
    messagePattern: EGeoSubjects.REGION_CREATE,
    data,
    metadata,
    })
  }
}
