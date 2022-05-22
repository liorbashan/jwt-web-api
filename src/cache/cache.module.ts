import { RedisService } from './../redis/redis.service';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  providers: [CacheService, RedisService],
  exports: [CacheService, RedisService],
})
export class CacheModule {}
