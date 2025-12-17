import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NATS_CLIENT',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL || 'nats://nats-server:4222'],
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.AUTH_SERVICE_URL || 'nats://nats-server:4222'],
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesModule {}
