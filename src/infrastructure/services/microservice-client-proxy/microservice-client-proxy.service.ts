import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { firstValueFrom } from 'rxjs';
import { formatMicroserviceErrorForLogger } from './utils/format-microservises-error-for-logger';

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

    const dataPayload = data !== undefined && data !== null ? data : {};
    const payload = metadata ? [dataPayload, metadata] : dataPayload;

    try {
      return await firstValueFrom<TOutput>(this.client.send(messagePattern, payload));
    } catch (err) {
      Logger.error(formatMicroserviceErrorForLogger(err, messagePattern));
      const exception = ExceptionWIthFormatRpcCode(err);

      // @ts-expect-error: any
      if (exception.status === 404) {
        return null as TOutput;
      }

      throw exception;
    }
  }
}
