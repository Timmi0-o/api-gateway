import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

interface ISendOptions<TInput> {
  messagePattern: string;
  data?: TInput;
  metadata?: Record<string, unknown>;
}

@Injectable()
export class MicroserviceClientProxyService implements IMicroserviceClientProxyService {
  constructor(private readonly client: ClientProxy) {}

  async send<TInput, TOutput>(options: ISendOptions<TInput>): Promise<TOutput> {
    const { messagePattern, data, metadata } = options;

    const payload = metadata ? [data ?? null, metadata] : (data ?? null);

    return firstValueFrom<TOutput>(this.client.send(messagePattern, payload));
  }
}
