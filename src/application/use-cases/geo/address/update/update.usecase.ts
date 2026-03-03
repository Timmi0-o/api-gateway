import { IUpdateAddressDto } from '@application/dtos/geo/address/update-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class UpdateAddressUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateAddressDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IAddress> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IUpdateAddressDto, IAddress>({
        messagePattern: EGeoSubjects.ADDRESS_UPDATE,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
