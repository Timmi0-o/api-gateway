import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MicroserviceClientProxyService implements IMicroserviceClientProxyService {
  constructor(private readonly client: ClientProxy) {}

  async send<TInput, TOutput>({
    messagePattern,
    data,
  }: {
    messagePattern: string;
    data: TInput;
  }): Promise<TOutput> {
    return firstValueFrom<TOutput>(this.client.send(messagePattern, data));
  }
}
