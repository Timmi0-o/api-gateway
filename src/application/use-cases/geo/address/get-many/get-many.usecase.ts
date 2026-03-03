import { IGetManyAddressDto } from '@application/dtos/geo/address/get-many-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { IListResponse } from '@application/dtos/geo/types';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoSubjects } from '@tourgis/common';

export class GetAddressesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetManyAddressDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IListResponse<IAddress>> {
    const { data, metadata } = params;

    return await this.clientProxy.send<IGetManyAddressDto, IListResponse<IAddress>>({
    messagePattern: EGeoSubjects.ADDRESS_GET_MANY,
    data: {
      limit: data.limit ?? 10,
      page: data.page ?? 1,
      offset: data.offset ?? 0,
      preset: data.preset ?? 'MINIMAL',
      filter: data.filter,
      orderBy: data.orderBy,
    },
    metadata,
    })
  }
}
