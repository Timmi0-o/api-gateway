import { IRedisConfig } from '@domain/services/i-redis.service';
import { registerAs } from '@nestjs/config';

export default registerAs(
  'redis',
  (): IRedisConfig => ({
    host: process.env['REDIS_HOST'] || 'localhost',
    port: Number(process.env['REDIS_PORT']) || 6379,
    password: process.env['REDIS_PASSWORD'] || undefined,
    db: process.env['REDIS_DB'] ? Number(process.env['REDIS_DB']) : 0,
  }),
);
