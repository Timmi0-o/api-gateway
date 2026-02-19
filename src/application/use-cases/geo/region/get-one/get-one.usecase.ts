import { IGetRegionDto } from '@application/dtos/geo/region/get-region.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class GetRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetRegionDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IRegionResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IGetRegionDto, IRegionResponse>({
        messagePattern: EGeoSubjects.REGION_GET_ONE,
        data: { slug: data.slug, preset: data.preset ?? 'BASE' },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
