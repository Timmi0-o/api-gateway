import { IGetOneAddressDto } from '@application/dtos/geo/address/get-one-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class GetAddressUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetOneAddressDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IAddress> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<IGetOneAddressDto, IAddress>({
        messagePattern: EGeoSubjects.ADDRESS_GET_ONE,
        data: {
          entityId: data.entityId,
          entityType: data.entityType,
          preset: data.preset ?? 'MINIMAL',
        },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
