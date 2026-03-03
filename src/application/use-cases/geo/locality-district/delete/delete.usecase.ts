import { IDeleteLocalityDistrictDto } from '@application/dtos/geo/locality-district/delete-locality-district.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class DeleteLocalityDistrictUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteLocalityDistrictDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IDeleteLocalityDistrictDto, ILocalityDistrictResponse>({
        messagePattern: EGeoSubjects.LOCALITY_DISTRICT_DELETE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
