import { AuthUsecaseModule } from '@infrastructure/modules/auth.module';
import { UserUsecaseModule } from '@infrastructure/modules/user.module';
import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule, AuthUsecaseModule, UserUsecaseModule],
})
export class AppModule {}
