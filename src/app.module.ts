import { AdminModule } from '@infrastructure/modules/admin.module';
import { AuthUsecaseModule } from '@infrastructure/modules/auth.module';
import { OrganizationUsecaseModule } from '@infrastructure/modules/organization.module';
import { RedisModule } from '@infrastructure/modules/redis.module';
import { TestGrpcModule } from '@infrastructure/modules/test-grpc.module';
import { UserCacheDataModule } from '@infrastructure/modules/user-cache-data.module';
import { UserUsecaseModule } from '@infrastructure/modules/user.module';
import { AuthServiceModule } from '@infrastructure/services/auth/auth.module';
import { JwtModule } from '@infrastructure/services/jwt/jwt.module';
import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    LoggerModule,
    AuthServiceModule,
    JwtModule,
    AuthUsecaseModule,
    UserUsecaseModule,
    UserCacheDataModule,
    OrganizationUsecaseModule,
    AdminModule,
    RedisModule,
    TestGrpcModule,
  ],
})
export class AppModule {}
