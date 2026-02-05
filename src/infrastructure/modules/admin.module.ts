import { GetAdminPermissionsUseCase } from '@application/use-cases/admin/permissions/get-permissions.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { AdminPermissionsController } from '@presentation/controllers/admin/permissions.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT)],
  controllers: [AdminPermissionsController],
  providers: [
    {
      provide: GetAdminPermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetAdminPermissionsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class AdminModule {}
