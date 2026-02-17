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
      const fileNameSlug = this.originalNameToSlug(file.originalname);
      const fileKey = this.generateFileKey(fileId, fileNameSlug, options);

      const uploadResult = await this.s3Service.uploadFile(fileKey, file.buffer, {
        contentType: file.mimetype,
        metadata: {
          originalnameSlug: fileNameSlug,
          uploadedBy: options.uploadedBy || 'unknown',
          organizationId: options.organizationId || 'unknown',
        },
      });

      uploadedFiles.push({
        ...uploadResult,
        originalName: fileNameSlug,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    return uploadedFiles;
  }

  private originalNameToSlug(originalName: string): string {
    const baseName = originalName.includes('.')
      ? originalName.slice(0, originalName.lastIndexOf('.'))
      : originalName;
    const transliterated = this.transliterateCyrillic(baseName);
    return (
      transliterated
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 200) || 'file'
    );
  }

  private transliterateCyrillic(text: string): string {
    const map: Record<string, string> = {
      а: 'a',
      б: 'b',
      в: 'v',
      г: 'g',
      д: 'd',
      е: 'e',
      ё: 'e',
      ж: 'zh',
      з: 'z',
      и: 'i',
      й: 'y',
      к: 'k',
      л: 'l',
      м: 'm',
      н: 'n',
      о: 'o',
      п: 'p',
      р: 'r',
      с: 's',
      т: 't',
      у: 'u',
      ф: 'f',
      х: 'h',
      ц: 'ts',
      ч: 'ch',
      ш: 'sh',
      щ: 'sch',
      ъ: '',
      ы: 'y',
      ь: '',
      э: 'e',
      ю: 'yu',
      я: 'ya',
      і: 'i',
      ї: 'yi',
      є: 'e',
      ґ: 'g',
      ў: 'u',
    };
    return text
      .split('')
      .map((char) => map[char.toLowerCase()] ?? map[char] ?? char)
      .join('');
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
