import { Readable } from 'stream';

export interface IS3Service {
  uploadFile(
    key: string,
    body: Buffer | Readable | ReadableStream,
    options?: IUploadOptions,
  ): Promise<IUploadFileResult>;

  uploadLargeFile(
    key: string,
    body: Buffer | Readable | ReadableStream,
    options?: IUploadOptions,
  ): Promise<IUploadFileResult>;

  getFileUrl(key: string, bucket?: string): Promise<Readable>;

  deleteFile(key: string, bucket?: string): Promise<boolean>;

  fileExists(key: string, bucket?: string): Promise<boolean>;

  getFileMetadata(key: string, bucket?: string): Promise<Record<string, string>>;

  listFiles(prefix?: string, options?: IListFilesOptions): Promise<string[]>;
}

export interface IUploadOptions {
  bucket?: string;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface IUploadFileResult {
  location: string;
  etag: string;
}

export interface IListFilesOptions {
  bucket?: string;
  maxKeys?: number;
}

export interface IS3Config {
  endpoint: string;
  region: string;
  port: number;
  username: string;
  password: string;
  bucket: string;
}
