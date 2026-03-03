import { IUpdateLocalityDistrictDto } from '@application/dtos/geo/locality-district/update-locality-district.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateLocalityDistrictUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateLocalityDistrictDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IUpdateLocalityDistrictDto, ILocalityDistrictResponse>({
        messagePattern: EGeoSubjects.LOCALITY_DISTRICT_UPDATE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
