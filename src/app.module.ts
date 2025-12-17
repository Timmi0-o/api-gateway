import { LoggerModule } from '@infrastructure/services/logger/logger.module';
import { Module } from '@nestjs/common';
import { ControllersModule } from '@presentation/controllers/controllers.module';

@Module({
  imports: [LoggerModule, ControllersModule],
})
export class AppModule {}
