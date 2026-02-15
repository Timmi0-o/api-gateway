import { S3Service } from '@infrastructure/services/s3/s3.service';
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

export interface IUploadedFile {
  location: string;
  etag: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface IUploadFileOptions {
  organizationId?: string;
  uploadedBy?: string;
}

@Injectable()
export class FileUploadService {
  constructor(private readonly s3Service: S3Service) {}

  async uploadFiles(
    files: Express.Multer.File[],
    options: IUploadFileOptions,
  ): Promise<IUploadedFile[]> {
    const uploadedFiles: IUploadedFile[] = [];

    for (const file of files) {
      const fileId: string = crypto.randomUUID();
      const fileKey = this.generateFileKey(fileId, file.originalname, options);

      const uploadResult = await this.s3Service.uploadFile(fileKey, file.buffer, {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          uploadedBy: options.uploadedBy || 'unknown',
          organizationId: options.organizationId || 'unknown',
        },
      });

      uploadedFiles.push({
        ...uploadResult,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    return uploadedFiles;
  }

  private generateFileKey(
    fileId: string,
    originalName: string,
    options: IUploadFileOptions,
  ): string {
    const extension = originalName.split('.').pop() || '';
    const timestamp = Date.now();

    if (options.organizationId) {
      return `organizations/${options.organizationId}/${timestamp}-${fileId}.${extension}`;
    }

    return `files/${timestamp}-${fileId}.${extension}`;
  }
}
