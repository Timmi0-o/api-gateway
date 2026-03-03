import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateOrganizationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      organizationId: string;
      name?: string;
      description?: string;
      isActive?: boolean;
      ownerId: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<boolean> {
    const { data, metadata } = params;

    await this.clientProxy.send<unknown, unknown>({
    messagePattern: EOrganizationSubjects.ORGANIZATION_UPDATE,
    data: {
      organizationId: data.organizationId,
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      ...(data.ownerId !== undefined ? { ownerId: data.ownerId } : {}),
    },
    metadata,
  });

  return true;
  }
}
