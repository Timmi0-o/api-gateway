import {
  ICreateOrganizationContractFileDto,
  ICreateOrganizationContractsResponseDto,
} from '@application/dtos/organization/organization-contracts-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  FileUploadService,
  IUploadedFile,
} from '@infrastructure/services/file-upload/file-upload.service';
import { ServiceException } from '@shared/exceptions/service.exception';
import { EOrganizationSubjects } from '@tourgis/common';

const S3_PUBLIC_BASE_URL = process.env['S3_PUBLIC_BASE_URL'] ?? 'http://localhost:9000';

export class CreateOrganizationContractsUseCase {
  constructor(
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async execute(params: {
    data: { registerRequestId: string; files: Express.Multer.File[] };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ICreateOrganizationContractsResponseDto> {
    const { data, metadata } = params;

    if (!data.registerRequestId?.trim()) {
      throw ServiceException.invalidCredentials('registerRequestId is required');
    }
    if (!data.files?.length) {
      throw ServiceException.invalidCredentials('At least one file is required');
    }

    const uploadedFiles = await this.fileUploadService.uploadFiles(data.files, {});
    const filesMetadata = this.mapUploadedToContractFiles(uploadedFiles);

    return this.clientProxy.send<
      { registerRequestId: string; files: ICreateOrganizationContractFileDto[] },
      ICreateOrganizationContractsResponseDto
    >({
      messagePattern: EOrganizationSubjects.ORGANIZATION_CONTRACT_CREATE,
      data: {
        registerRequestId: data.registerRequestId,
        files: filesMetadata,
      },
      metadata,
    });
  }

  private mapUploadedToContractFiles(
    uploaded: IUploadedFile[],
  ): ICreateOrganizationContractFileDto[] {
    return uploaded.map((file) => ({
      fileName: file.originalName,
      originalName: file.originalName,
      mimeType: file.mimeType,
      fileSize: file.size,
      fileUrl: `${S3_PUBLIC_BASE_URL}/${file.location}`,
      metadata: { etag: file.etag, location: file.location },
    }));
  }
}
