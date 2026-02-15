import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export interface ICreateOrganizationFolderData {
  organizationId: string;
  name: string;
  parentId?: string;
  allowedPurposes?: string[];
}

export class CreateOrganizationFolderUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateOrganizationFolderData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    try {
      await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_FOLDER_CREATE,
        data,
        metadata,
      });

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
