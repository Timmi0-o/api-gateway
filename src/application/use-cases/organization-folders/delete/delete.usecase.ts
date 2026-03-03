import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IDeleteOrganizationFolderData {
  organizationId: string;
  folderId: string;
}

export class DeleteOrganizationFolderUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteOrganizationFolderData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_FOLDER_DELETE,
    data,
    metadata,
  });

  return { success: true };
  }
}
