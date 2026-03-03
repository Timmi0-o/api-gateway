import { IDeleteAddressDto } from '@application/dtos/geo/address/delete-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class DeleteAddressUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteAddressDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IAddress> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IDeleteAddressDto, IAddress>({
    messagePattern: EGeoSubjects.ADDRESS_DELETE,
    data,
    metadata,
    })
  }
}
