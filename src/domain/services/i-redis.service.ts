export const REDIS_SERVICE = Symbol('IRedisService');

export interface IRedisService {
  set(key: string, value: string | Record<string, unknown>, ttlSeconds?: number): Promise<void>;
  get(key: string): Promise<string | null>;
  del(key: string): Promise<number>;
  delMany(keys: string[]): Promise<number>;
  exists(key: string): Promise<boolean>;
  keys(pattern: string): Promise<string[]>;
}

export interface IRedisConfig {
  host: string;
  port: number;
  password?: string;
  db?: number;
}
