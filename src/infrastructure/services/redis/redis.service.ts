import { IRedisConfig, IRedisService } from '@domain/services/i-redis.service';
import redisConfig from '@infrastructure/config/redis.config';
import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements IRedisService, OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(@Inject(redisConfig.KEY) private readonly config: ConfigType<() => IRedisConfig>) {
    this.client = new Redis({
      host: this.config.host,
      port: this.config.port,
      password: this.config.password,
      db: this.config.db ?? 0,
    });
  }

  async onModuleInit(): Promise<void> {
    this.client.on('error', (err) => this.logger.error(`Redis error: ${err.message}`));
    this.client.on('connect', () => this.logger.log('Redis connected'));

    try {
      await Promise.race([
        new Promise<void>((resolve) => {
          if (this.client.status === 'ready') return resolve();
          this.client.once('ready', () => resolve());
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Redis connection timeout')), 5000),
        ),
      ]);
      this.logger.log('Redis ready');
    } catch (err) {
      this.logger.warn(`Redis not ready at startup: ${err instanceof Error ? err.message : ''}`);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }

  async set(
    key: string,
    value: string | Record<string, unknown>,
    ttlSeconds?: number,
  ): Promise<void> {
    const formatValue = typeof value === 'object' ? JSON.stringify(value) : value;

    if (ttlSeconds != null) {
      await this.client.setex(key, ttlSeconds, formatValue);
    } else {
      await this.client.set(key, formatValue);
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async del(key: string): Promise<number> {
    return await this.client.del(key);
  }

  async delMany(keys: string[]): Promise<number> {
    if (keys.length === 0) return 0;
    return await this.client.del(...keys);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern);
  }
}
