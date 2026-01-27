import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class UpdateUserUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    commonUserId: string,
    data: {
      userId: string;
      name?: string;
      surname?: string;
      patronymic?: string;
      phone?: string;
      language?: string;
      status?: string;
    },
  ): Promise<boolean> {
    try {
      await this.clientProxy.send({
        messagePattern: 'auth.v1.user.update-user',
        data: {
          userId: data.userId,
          ...(data.name !== undefined ? { name: data.name } : {}),
          ...(data.surname !== undefined ? { surname: data.surname } : {}),
          ...(data.patronymic !== undefined ? { patronymic: data.patronymic } : {}),
          ...(data.phone !== undefined ? { phone: data.phone } : {}),
          ...(data.language !== undefined ? { language: data.language } : {}),
          ...(data.status !== undefined ? { status: data.status } : {}),
        },
        metadata: {
          commonUserId,
        },
      });

      return true;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
