import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  FileUploadService,
  IUploadedFile,
} from '@infrastructure/services/file-upload/file-upload.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export interface ICreateOrganizationFilesData {
  commonUserId: string;
  organizationId: string;
  files: Express.Multer.File[];
  folderId?: string;
}

export class CreateOrganizationFilesUseCase {
  constructor(
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async execute(params: {
    data: ICreateOrganizationFilesData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    const { files, organizationId, commonUserId, folderId } = data;

    const createdFilesMetadata: IUploadedFile[] = [];

    try {
      const uploadedFiles = await this.uploadFileToS3(files, organizationId, commonUserId);
      createdFilesMetadata.push(
        ...uploadedFiles.data.map((file) => ({
          ...file,
          folderId,
        })),
      );
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }

    try {
      await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_FILE_CREATE_MANY,
        data: {
          files: createdFilesMetadata,
          organizationId,
        },
        metadata,
      });

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }

  async uploadFileToS3(
    files: Express.Multer.File[],
    organizationId?: string,
    commonUserId?: string,
  ): Promise<{ success: boolean; data: IUploadedFile[] }> {
    const data = await this.fileUploadService.uploadFiles(files, {
      organizationId,
      uploadedBy: commonUserId,
    });
    return { success: true, data };
  }
}
