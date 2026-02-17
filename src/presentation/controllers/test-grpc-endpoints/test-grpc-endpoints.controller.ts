import { TestGrpcUseCase } from '@application/use-cases/test-grpc/test-grpc.usecase';
import { IUploadedFile } from '@infrastructure/services/file-upload/file-upload.service';
import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller({ path: 'test-grpc-endpoints', version: '1' })
export class TestGrpcEndpointsController {
  constructor(private readonly testGrpcUseCase: TestGrpcUseCase) {}

  @Post()
  async testGrpcEndpoints(
    @Body() data: { messagePattern: string; data: unknown; metadata: Record<string, unknown> },
  ): Promise<{ success: boolean; data: unknown }> {
    return this.testGrpcUseCase.execute(data);
  }

  @Post('upload-s3')
  @UseInterceptors(FilesInterceptor('files', 10, { limits: { fileSize: 500 * 1024 * 1024 } }))
  async uploadToS3(@UploadedFiles() files: Express.Multer.File[]): Promise<{
    success: boolean;
    data: IUploadedFile[];
  }> {
    return this.testGrpcUseCase.uploadFileToS3(files);
  }
}
