import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { IDeleteWharfDto } from '@application/dtos/geo/wharf/delete-wharf.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoTransportSubjects } from '@tourgis/common';

export class DeleteWharfUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteWharfDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IWharfResponse> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IDeleteWharfDto, IWharfResponse>({
        messagePattern: EGeoTransportSubjects.WHARF_DELETE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
