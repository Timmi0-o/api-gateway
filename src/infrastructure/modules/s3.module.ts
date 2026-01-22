import s3Config from '@infrastructure/config/s3.config';
import { S3Service } from '@infrastructure/services/s3/s3.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(s3Config)],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
