import { S3Module } from '@infrastructure/modules/s3.module';
import { Module } from '@nestjs/common';
import { FilesController } from '@presentation/controllers/files/files.controller';

@Module({
  imports: [S3Module],
  controllers: [FilesController],
})
export class FilesModule {}
