import { IS3Config } from '@domain/services/i-s3.service';
import { registerAs } from '@nestjs/config';

export default registerAs(
  's3',
  (): IS3Config => ({
    endpoint: process.env['S3_ENDPOINT'] || 'http://files-minio:9000',
    region: process.env['S3_REGION'] || 'us-east-1',
    port: Number(process.env['S3_PORT']) || 9000,
    username: process.env['S3_ACCESS_KEY'] || 'minioadmin',
    password: process.env['S3_SECRET_KEY'] || 'minioadmin',
    bucket: process.env['S3_BUCKET'] || 'files',
  }),
);
