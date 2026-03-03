import { IUpdateLocalityDto } from '@application/dtos/geo/locality/update-locality.dto';
import { ILocalityResponse } from '@application/dtos/geo/response/locality.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateLocalityUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateLocalityDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateLocalityDto, ILocalityResponse>({
    messagePattern: EGeoSubjects.LOCALITY_UPDATE,
    data,
    metadata,
    })
  }
}
