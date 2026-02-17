import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  FileUploadService,
  IUploadedFile,
} from '@infrastructure/services/file-upload/file-upload.service';
import { Injectable } from '@nestjs/common';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

@Injectable()
export class TestGrpcUseCase {
  constructor(
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async execute(data: {
    messagePattern: string;
    data?: unknown;
    metadata?: Record<string, unknown>;
  }): Promise<{ success: boolean; data: unknown }> {
    const resObject: {
      messagePattern?: string;
      data?: unknown;
      metadata?: Record<string, unknown>;
    } = {};

    if (data.messagePattern) {
      resObject.messagePattern = data.messagePattern;
    }

    if (data.data && Object.keys(data.data).length > 0) {
      resObject.data = data.data;
    }

    if (data.metadata && Object.keys(data.metadata).length > 0) {
      resObject.metadata = data.metadata;
    }

    try {
      const result = await this.clientProxy.send<unknown, unknown>(
        resObject as unknown as {
          messagePattern: string;
          data?: unknown;
          metadata?: Record<string, unknown>;
        },
      );

      return {
        success: true,
        data: result,
      };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }

  async uploadFileToS3(files: Express.Multer.File[]): Promise<{
    success: boolean;
    data: IUploadedFile[];
  }> {
    const data = await this.fileUploadService.uploadFiles(files, {
      organizationId: '123',
      uploadedBy: 'test',
    });
    return { success: true, data };
  }
}
