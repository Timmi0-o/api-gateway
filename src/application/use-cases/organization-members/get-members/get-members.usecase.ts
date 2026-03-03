import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetMembersUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      organizationId: string;
      filter?: string;
      limit?: number;
      offset?: number;
      preset: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_GET_MANY,
    data: {
      organizationId: data.organizationId,
      filter: data.filter ? JSON.parse(data.filter) : undefined,
      limit: data?.limit ? +data.limit : 25,
      offset: data.offset ?? 0,
      preset: data.preset ?? 'MINIMAL',
    },
    metadata,
  });

  return res;
  }
}
