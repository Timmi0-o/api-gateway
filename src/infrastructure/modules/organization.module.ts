import { CreateOrganizationUseCase } from '@application/use-cases/organization/create/create.usecase';
import { GetOrganizationsUseCase } from '@application/use-cases/organization/get/get.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { OrganizationController } from '@presentation/controllers/organization/organization.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT)],
  controllers: [OrganizationController],
  providers: [
    {
      provide: GetOrganizationsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateOrganizationUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class OrganizationUsecaseModule {}
