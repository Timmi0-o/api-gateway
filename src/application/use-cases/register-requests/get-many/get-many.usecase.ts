import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';
import { IPaginationMeta } from '@tourgis/contracts';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class GetRegisterRequestsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery & { registerRequestId?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ data: IRegisterRequestDto[]; meta: IPaginationMeta }> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams({
      preset: data.preset,
      filter: data.filter,
      orderBy: data.orderBy,
      limit: data.limit,
      page: data.page,
    });

    return this.clientProxy.send<
      INormalizedArrayQuery,
      { data: IRegisterRequestDto[]; meta: IPaginationMeta }
    >({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_GET_MANY,
      data: normalizedQuery,
      metadata,
    });
  }
}
