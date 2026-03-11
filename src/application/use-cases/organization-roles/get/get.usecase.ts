import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationRolesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IRawArrayQuery & { organizationId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRoleMinimalDto[]> {
    const { data, metadata } = params;

    const normalizedQuery = splitArrayQueryParams({
      preset: data.preset,
      limit: data.limit,
      page: data.page,
      filter: data.filter,
    });

    const payload: INormalizedArrayQuery & { organizationId: string } = {
      ...normalizedQuery,
      organizationId: data.organizationId,
      filter: normalizedQuery.filter
        ? { ...normalizedQuery.filter, name: { not: 'Владелец' } }
        : undefined,
    };

    return this.clientProxy.send<
      INormalizedArrayQuery & { organizationId: string },
      IRoleMinimalDto[]
    >({
      messagePattern: EOrganizationSubjects.ROLE_GET_MANY,
      data: payload,
      metadata,
    });
  }
}
