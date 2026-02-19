import { IDeleteRegionDto } from '@application/dtos/geo/region/delete-region.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class DeleteRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteRegionDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegionResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IDeleteRegionDto, IRegionResponse>({
        messagePattern: EGeoSubjects.REGION_DELETE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
