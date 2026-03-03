import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { IGetWharfDto } from '@application/dtos/geo/wharf/get-wharf.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetWharfUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetWharfDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IWharfResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IGetWharfDto, IWharfResponse>({
        messagePattern: EGeoTransportSubjects.WHARF_GET_ONE,
        data: { slugOrId: data.slugOrId, preset: data.preset ?? 'BASE' },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
