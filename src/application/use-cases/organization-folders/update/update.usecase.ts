import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IUpdateOrganizationFolderData {
  organizationId: string;
  folderId: string;
  name?: string;
  systemType?: string | null;
  allowedPurposes?: string[];
}

export class UpdateOrganizationFolderUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateOrganizationFolderData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_FOLDER_UPDATE,
    data,
    metadata,
  });

  return { success: true };
  }
}
