import { IBaseArrayQuery } from '@application/dtos/geo/query.dto';
import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EGeoTransportSubjects } from '@tourgis/common';

export class GetWharvesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IBaseArrayQuery;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<IWharfResponse[]> {
    const { data, metadata } = params;

    return await this.clientProxy.send<Record<string, unknown>, IWharfResponse[]>({
    messagePattern: EGeoTransportSubjects.WHARF_GET_MANY,
    data: {
      limit: data.limit ?? 25,
      offset: data.offset ?? 0,
      preset: data.preset ?? 'BASE',
      filter: data.filter ? (JSON.parse(data.filter) as Record<string, unknown>) : undefined,
      orderBy: data.orderBy
        ? (JSON.parse(data.orderBy) as Record<string, 'asc' | 'desc'>)
        : undefined,
      include: data.include,
      select: data.select,
    },
    metadata,
    })
  }
}
