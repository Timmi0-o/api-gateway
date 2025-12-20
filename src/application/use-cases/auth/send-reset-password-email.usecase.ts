import { ISendResetPasswordEmailDto } from '@application/dtos/auth/send-reset-password-email.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ISendResetPasswordEmailResponse } from '@domain/types/auth.types';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class SendResetPasswordEmailUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(data: ISendResetPasswordEmailDto): Promise<ISendResetPasswordEmailResponse> {
    try {
      return await this.clientProxy.send<
        ISendResetPasswordEmailDto,
        ISendResetPasswordEmailResponse
      >({
        messagePattern: RPC_PATTERNS.auth.sendResetPasswordEmail,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
