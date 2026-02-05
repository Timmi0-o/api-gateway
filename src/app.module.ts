import { AdminModule } from '@infrastructure/modules/admin.module';
import { AuthUsecaseModule } from '@infrastructure/modules/auth.module';
import { FilesModule } from '@infrastructure/modules/files.module';
import { OrganizationUsecaseModule } from '@infrastructure/modules/organization.module';
import { S3Module } from '@infrastructure/modules/s3.module';
import { TestGrpcModule } from '@infrastructure/modules/test-grpc.module';
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
    OrganizationUsecaseModule,
    AdminModule,
    S3Module,
    FilesModule,
    TestGrpcModule,
  ],
})
export class AppModule {}
