import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import {
  IListFilesOptions,
  IS3Config,
  IS3Service,
  IUploadFileResult,
  IUploadOptions,
} from '@domain/services/i-s3.service';
import s3Config from '@infrastructure/config/s3.config';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ExternalServiceError } from '@tourgis/errors';
import { Readable } from 'stream';

@Injectable()
export class S3Service implements IS3Service, OnModuleInit {
  private readonly logger = new Logger(S3Service.name);

  private readonly s3Client: S3Client;
  private readonly defaultBucket: string;

  constructor(@Inject(s3Config.KEY) private readonly s3Config: ConfigType<() => IS3Config>) {
    this.s3Client = new S3Client({
      endpoint: this.s3Config.endpoint,
      region: this.s3Config.region,
      credentials: {
        accessKeyId: this.s3Config.username,
        secretAccessKey: this.s3Config.password,
      },
      forcePathStyle: true,
    });

    this.defaultBucket = this.s3Config.bucket;
  }

  async onModuleInit(): Promise<void> {
    try {
      await this.ensureBucketExists();
    } catch (error) {
      this.logger.warn(
        `Failed to connect to S3 on startup: ${error.message}. S3 will be unavailable until connection is established.`,
      );
    }
  }

  async uploadFile(
    key: string,
    body: Buffer | Readable | ReadableStream,
    options?: IUploadOptions,
  ): Promise<IUploadFileResult> {
    const bucket = options?.bucket || this.defaultBucket;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: options?.contentType,
      Metadata: options?.metadata,
    });

    try {
      const response = await this.s3Client.send(command);

      return {
        location: `${bucket}/${key}`,
        etag: response.ETag || '',
      };
    } catch (err) {
      const message = err?.message ?? String(err);
      this.logger.error(`Error uploading file: ${message}`, err?.stack);
      throw ExternalServiceError.withMessage(`Произошла ошибка при загрузке файла: ${message}`);
    }
  }

  async uploadLargeFile(
    key: string,
    body: Buffer | Readable | ReadableStream,
    options?: IUploadOptions,
  ): Promise<IUploadFileResult> {
    const bucket = options?.bucket || this.defaultBucket;

    const command = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: options?.contentType,
        Metadata: options?.metadata,
      },
    });

    try {
      const response = await command.done();

      return {
        location: `${bucket}/${key}`,
        etag: response.Location || '',
      };
    } catch (err) {
      const message = err?.message ?? String(err);
      this.logger.error(`Error uploading large file: ${message}`, err?.stack);
      throw ExternalServiceError.withMessage(`Произошла ошибка при загрузке файла: ${message}`);
    }
  }

  async getFileUrl(key: string, bucket?: string): Promise<Readable> {
    const command = new GetObjectCommand({
      Bucket: bucket || this.defaultBucket,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      return response.Body as Readable;
    } catch (err) {
      this.logger.error(`Error getting file url: ${err.message}`, err.stack);
      throw ExternalServiceError.withMessage('Произошла ошибка при получении файла');
    }
  }

  async deleteFile(key: string, bucket?: string): Promise<boolean> {
    const command = new DeleteObjectCommand({
      Bucket: bucket || this.defaultBucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
      return true;
    } catch (err) {
      this.logger.error(`Error deleting file: ${err.message}`, err.stack);
      throw ExternalServiceError.withMessage('Произошла ошибка при удалении файла');
    }
  }

  async fileExists(key: string, bucket?: string): Promise<boolean> {
    const command = new HeadObjectCommand({
      Bucket: bucket || this.defaultBucket,
      Key: key,
    });

    try {
      await this.s3Client.send(command);
      return true;
    } catch (err) {
      if (err instanceof S3ServiceException && err.name === 'NotFound') {
        return false;
      }

      this.logger.error(`Error checking file existence: ${err.message}`, err.stack);
      throw ExternalServiceError.withMessage('Произошла ошибка при получении файла');
    }
  }

  async getFileMetadata(key: string, bucket?: string): Promise<Record<string, string>> {
    const command = new HeadObjectCommand({
      Bucket: bucket || this.defaultBucket,
      Key: key,
    });

    try {
      const response = await this.s3Client.send(command);
      return response.Metadata || {};
    } catch (err) {
      this.logger.error(`Error getting file metadata: ${err.message}`, err.stack);
      throw ExternalServiceError.withMessage('Произошла ошибка при получении файла');
    }
  }

  async listFiles(prefix?: string, options?: IListFilesOptions): Promise<string[]> {
    const command = new ListObjectsV2Command({
      Bucket: options?.bucket || this.defaultBucket,
      Prefix: prefix,
      MaxKeys: options?.maxKeys,
    });

    try {
      const response = await this.s3Client.send(command);
      return response.Contents?.map((item) => item.Key || '') || [];
    } catch (err) {
      this.logger.error(`Error listing files: ${err.message}`, err.stack);
      throw ExternalServiceError.withMessage('Произошла ошибка при получении файлов');
    }
  }

  private async ensureBucketExists(): Promise<void> {
    try {
      await this.s3Client.send(
        new HeadBucketCommand({
          Bucket: this.defaultBucket,
        }),
      );

      this.logger.log(`Bucket ${this.defaultBucket} exists and is accessible`);
    } catch (error) {
      if (error.$metadata && error.$metadata.httpStatusCode === 403) {
        this.logger.warn(
          `Error accessing bucket (403 Forbidden). Check access rights and credentials.`,
        );

        throw new Error(`Error accessing bucket: ${error.message}`);
      } else if (
        (error.$metadata && error.$metadata.httpStatusCode === 404) ||
        (error instanceof S3ServiceException && error.name === 'NotFound')
      ) {
        this.logger.log(`Bucket ${this.defaultBucket} not found, trying to create...`);
        try {
          await this.s3Client.send(
            new CreateBucketCommand({
              Bucket: this.defaultBucket,
            }),
          );

          this.logger.log(`Bucket ${this.defaultBucket} created successfully`);
        } catch (createError) {
          this.logger.error(`Error creating bucket: ${createError.message}`);
          throw createError;
        }
      } else {
        this.logger.error(`Error checking bucket: ${error.message}`, error.stack);
        throw error;
      }
    }
  }
}
