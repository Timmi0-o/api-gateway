import { ICreateAddressDto } from '@application/dtos/geo/address/create-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class CreateAddressUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateAddressDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IAddress> {
    const { data, metadata } = params;

    return this.clientProxy.send<ICreateAddressDto, IAddress>({
      messagePattern: EGeoSubjects.ADDRESS_CREATE,
      data,
      metadata,
    });
  }
}
