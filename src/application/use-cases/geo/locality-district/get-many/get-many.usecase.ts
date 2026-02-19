import { IGeoQueryDto } from '@application/dtos/geo/query.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EGeoSubjects } from '@tourgis/common';

export class GetLocalityDistrictsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGeoQueryDto;
    metadata?: IMetadataObjectForGrpcRequest;
  }): Promise<ILocalityDistrictResponse[]> {
    const { data, metadata } = params;

    try {
      return await this.clientProxy.send<
        IGeoQueryDto,
        ILocalityDistrictResponse[]
      >({
        messagePattern: EGeoSubjects.LOCALITY_DISTRICT_GET_MANY,
        data: {
          limit: data.limit ?? 25,
          offset: data.offset ?? 0,
          preset: data.preset ?? 'BASE',
          filter: data.filter,
          orderBy: data.orderBy,
          include: data.include,
          select: data.select,
        },
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
