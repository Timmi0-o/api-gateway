import { TestGrpcUseCase } from '@application/use-cases/test-grpc/test-grpc.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { S3Module } from '@infrastructure/modules/s3.module';
import { FileUploadService } from '@infrastructure/services/file-upload/file-upload.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { TestGrpcEndpointsController } from '@presentation/controllers/test-grpc-endpoints/test-grpc-endpoints.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.TEST_GRPC_CLIENT), S3Module],
  controllers: [TestGrpcEndpointsController],
  providers: [
    {
      provide: TestGrpcUseCase,
      useFactory: (
        clientProxy: IMicroserviceClientProxyService,
        fileUploadService: FileUploadService,
      ) => {
        return new TestGrpcUseCase(clientProxy, fileUploadService);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE, FileUploadService],
    },
  ],
})
export class TestGrpcModule {}
