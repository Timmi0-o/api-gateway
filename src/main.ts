import { GlobalExceptionFilter } from '@infrastructure/filters/global-exception.filter';
import { LoggingInterceptor } from '@infrastructure/interceptors/logging.interceptor';
import { ResponseInterceptor } from '@infrastructure/interceptors/response.interceptor';
import { LoggerService } from '@infrastructure/services/logger/logger.service';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    bodyParser: true,
    rawBody: true,
  });

  const logger = app.get(LoggerService);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  const PORT = process.env.APP_PORT ?? 3000;

  // Подключаем NATS микросервис
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL ?? 'nats://nats-server:4222',
    },
  });

  await app.startAllMicroservices();

  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger), new ResponseInterceptor());

  await app.listen(PORT);

  logger.configuration(`✅ HTTP GATEWAY server started on port ${PORT}`);
  logger.configuration(
    `✅ NATS microservice connected to ${process.env.NATS_URL ?? 'nats://nats-server:4222'}`,
  );
}

void bootstrap();
