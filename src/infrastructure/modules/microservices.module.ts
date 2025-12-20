import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

const clientsModule = ClientsModule.register([
  {
    name: NATS_CLIENTS.AUTH_CLIENT,
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://nats-server:4222'],
    },
  },
  {
    name: NATS_CLIENTS.USER_CLIENT,
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URL || 'nats://nats-server:4222'],
    },
  },
]);

@Module({
  imports: [clientsModule],
  exports: [clientsModule],
})
export class MicroservicesModule {}
