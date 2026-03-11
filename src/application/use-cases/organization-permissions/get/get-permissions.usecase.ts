import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetOrganizationPermissionsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery & { organizationId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams({
      preset: data.preset,
      limit: data.limit,
      page: data.page,
    });

    const payload: INormalizedArrayQuery & { organizationId: string } = {
      ...normalizedQuery,
      organizationId: data.organizationId,
    };

    return this.clientProxy.send<INormalizedArrayQuery & { organizationId: string }, unknown>({
      messagePattern: EOrganizationSubjects.PERMISSION_GET_MANY,
      data: payload,
      metadata,
    });
  }
}
