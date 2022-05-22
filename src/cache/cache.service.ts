import { RedisService } from './../redis/redis.service';
import { ICache } from './../interfaces/cache.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService implements ICache {
  constructor(private _redis: RedisService) {}
  public async getKey(key: string): Promise<string> {
    const result: string = await this._redis.getValue(key).catch((err) => {
      throw new Error(err);
    });
    return result;
  }
  public async setValue(key: string, value: any, ttl?: number): Promise<void> {
    await this._redis.setValue(key, value).catch((err) => {
      throw new Error(err);
    });
  }
}
