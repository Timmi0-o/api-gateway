import { MicroservicesModule } from '@infrastructure/modules/microservices.module';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { MicroserviceClientProxyService } from './microservice-client-proxy.service';

export const MICROSERVICE_CLIENT_PROXY_SERVICE = Symbol('MICROSERVICE_CLIENT_PROXY_SERVICE');

@Module({})
export class MicroserviceClientProxyModule {
  static register(clientName: (typeof NATS_CLIENTS)[keyof typeof NATS_CLIENTS]): DynamicModule {
    return {
      module: MicroserviceClientProxyModule,
      imports: [MicroservicesModule],
      providers: [
        {
          provide: MICROSERVICE_CLIENT_PROXY_SERVICE,
          useFactory: (client: ClientProxy) => new MicroserviceClientProxyService(client),
          inject: [NATS_CLIENTS[clientName]],
        },
      ],
      exports: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    };
  }
}
