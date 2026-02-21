import { IGetDistrictRegionDto } from '@application/dtos/geo/district-region/get-district-region.dto';
import { IDistrictRegionResponse } from '@application/dtos/geo/response/district-region.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class GetDistrictRegionUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetDistrictRegionDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IDistrictRegionResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<
        IGetDistrictRegionDto,
        IDistrictRegionResponse
      >({
        messagePattern: EGeoSubjects.DISTRICT_REGION_GET_ONE,
        data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
