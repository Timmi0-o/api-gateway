import { AuthUsecaseModule } from '@infrastructure/modules/auth.module';
import { UserUsecaseModule } from '@infrastructure/modules/user.module';
import { AuthServiceModule } from '@infrastructure/services/auth/auth.module';
import { JwtModule } from '@infrastructure/services/jwt/jwt.module';
import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule, AuthServiceModule, JwtModule, AuthUsecaseModule, UserUsecaseModule],
})
export class AppModule {}
