import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IUpdateOrganizationFileData {
  organizationId: string;
  fileId: string;
  fileName?: string;
  folderId?: string;
  tags?: string[];
}

export class UpdateOrganizationFileUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateOrganizationFileData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_FILE_UPDATE,
    data,
    metadata,
  });

  return { success: true };
  }
}
