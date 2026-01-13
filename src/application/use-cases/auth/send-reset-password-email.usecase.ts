import { ISendResetPasswordEmailDto } from '@application/dtos/auth/send-reset-password-email.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ISendResetPasswordEmailResponse } from '@domain/types/auth.types';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class SendResetPasswordEmailUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(data: ISendResetPasswordEmailDto): Promise<ISendResetPasswordEmailResponse> {
    try {
      return await this.clientProxy.send<
        ISendResetPasswordEmailDto,
        ISendResetPasswordEmailResponse
      >({
        messagePattern: EAuthSubjects.SEND_RESET_PASSWORD_EMAIL,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
