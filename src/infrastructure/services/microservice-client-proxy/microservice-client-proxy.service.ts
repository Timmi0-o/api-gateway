import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
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

    try {
      return await firstValueFrom<TOutput>(this.client.send(messagePattern, payload));
    } catch (err) {
      const exception = ExceptionWIthFormatRpcCode(err);

      // @ts-expect-error: any
      if (exception.status === 404) {
        return null as TOutput;
      }

      throw exception;
    }
  }
}
