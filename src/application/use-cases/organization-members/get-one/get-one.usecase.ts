import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetOneOrganizationMemberUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { organizationId: string; userId: string; preset?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_GET_ONE,
    data: {
      organizationId: data.organizationId,
      userId: data.userId,
      preset: data.preset ?? 'MINIMAL',
    },
    metadata,
  });

  return res;
  }
}
