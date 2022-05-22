import { Injectable } from '@nestjs/common';
import { createClient, RedisClientOptions, RedisClientType } from 'redis';
import { getOsEnv } from '../lib/utils';

@Injectable()
export class RedisService {
  public factory = (options: RedisClientOptions) => {
    return createClient(options);
  };
  public redisClient: RedisClientType<any, any, any>;
  constructor() {
    const _options: RedisClientOptions = {
      url: `redis://${getOsEnv('REDIS_HOST')}:${getOsEnv('REDIS_PORT')}`,
    };
    this.redisClient = this.factory(_options);
    this.redisClient.on('error', (err) => {
      console.log(err);
    });
    this.init();
  }

  private async init() {
    await this.redisClient.connect();
    console.log('REDIS Connected');
  }

  public async getValue(key: string): Promise<any> {
    return await this.redisClient.get(key).catch((err) => {
      console.log('Redis GET error: ', err);
      throw new Error(err);
    });
  }

  public async setValue(key: string, value: any): Promise<any> {
    if (typeof value !== 'string') {
      value = JSON.stringify(value);
    }
    return await this.redisClient.set(key, value).catch((err) => {
      console.log('Redis SET error: ', err);
      throw new Error(err);
    });
  }
}
