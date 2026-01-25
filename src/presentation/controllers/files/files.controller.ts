import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { S3Service } from '@infrastructure/services/s3/s3.service';
import { Controller, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'files', version: '1' })
@UseGuards(RsaAuthGuard)
export class FilesController {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadFiles(
    @GetCommonUserId() commonUserId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<{
    success: boolean;
    data: Array<{
      key: string;
      location: string;
      etag: string;
      originalName: string;
    }>;
  }> {
    const uploadPromises = files.map(async (file) => {
      const fileKey = `${Date.now()}-${file.originalname}`;

      const result = await this.s3Service.uploadFile(fileKey, Buffer.from(file.buffer), {
        contentType: file.mimetype,
        metadata: {
          uploadedBy: commonUserId,
          originalName: file.originalname,
          size: file.size.toString(),
        },
      });

      return {
        key: fileKey,
        location: result.location,
        etag: result.etag,
        originalName: file.originalname,
      };
    });

    const results = await Promise.all(uploadPromises);

    return {
      success: true,
      data: results,
    };
  }
}
