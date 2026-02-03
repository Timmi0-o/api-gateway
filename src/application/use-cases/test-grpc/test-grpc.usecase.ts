import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IS3Service } from '@domain/services/i-s3.service';
import { Injectable } from '@nestjs/common';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

@Injectable()
export class TestGrpcUseCase {
  constructor(
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly s3Service: IS3Service,
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
    data: Array<{
      key: string;
      location: string;
      etag: string;
      originalName: string;
      size: number;
      mimetype: string;
      metadata: Record<string, string>;
    }>;
  }> {
    const uploadPromises = files.map(async (file) => {
      const fileKey = `test/${Date.now()}-${file.originalname}`;
      const result = await this.s3Service.uploadFile(fileKey, Buffer.from(file.buffer), {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          size: file.size.toString(),
        },
      });
      const metadata = await this.s3Service.getFileMetadata(fileKey);
      return {
        key: fileKey,
        location: result.location,
        etag: result.etag,
        originalName: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
        metadata,
      };
    });
    const data = await Promise.all(uploadPromises);
    return { success: true, data };
  }
}
