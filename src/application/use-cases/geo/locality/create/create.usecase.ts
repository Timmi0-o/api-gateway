import { ICreateLocalityDto } from '@application/dtos/geo/locality/create-locality.dto';
import { ILocalityResponse } from '@application/dtos/geo/response/locality.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class CreateLocalityUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateLocalityDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<ICreateLocalityDto, ILocalityResponse>({
        messagePattern: EGeoSubjects.LOCALITY_CREATE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
