import { IGetLocalityDto } from '@application/dtos/geo/locality/get-locality.dto';
import { ILocalityResponse } from '@application/dtos/geo/response/locality.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class GetLocalityUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetLocalityDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IGetLocalityDto, ILocalityResponse>({
        messagePattern: EGeoSubjects.LOCALITY_GET_ONE,
        data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
