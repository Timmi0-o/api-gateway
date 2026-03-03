import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { IUpdateWharfDto } from '@application/dtos/geo/wharf/update-wharf.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class UpdateWharfUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateWharfDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IWharfResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IUpdateWharfDto, IWharfResponse>({
    messagePattern: EGeoTransportSubjects.WHARF_UPDATE,
    data,
    metadata,
    })
  }
}
