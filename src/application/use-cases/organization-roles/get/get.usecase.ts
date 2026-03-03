import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRoleMinimalDto } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationRolesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      filter?: string;
      limit?: number;
      offset?: number;
      organizationId: string;
      preset: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRoleMinimalDto[]> {
    const { data: query, metadata } = params;

    const res = await this.clientProxy.send<unknown, IRoleMinimalDto[]>({
    messagePattern: EOrganizationSubjects.ROLE_GET_MANY,
    data: {
      organizationId: query.organizationId,
      filter: query.filter
        ? { ...JSON.parse(query.filter), name: { not: 'Владелец' } }
        : undefined,
      limit: query?.limit ? +query.limit : 25,
      offset: query.offset ?? 0,
      preset: query.preset ?? 'MINIMAL',
    },
    metadata,
  });

  return res;
  }
}
