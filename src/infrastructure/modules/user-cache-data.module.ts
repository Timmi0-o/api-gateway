import { RedisModule } from '@infrastructure/modules/redis.module';
import { UserUsecaseModule } from '@infrastructure/modules/user.module';
import { UserCacheDataService } from '@infrastructure/services/user-cache-data/user-cache-data.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [RedisModule, UserUsecaseModule],
  providers: [UserCacheDataService],
  exports: [UserCacheDataService],
})
export class UserCacheDataModule {}
