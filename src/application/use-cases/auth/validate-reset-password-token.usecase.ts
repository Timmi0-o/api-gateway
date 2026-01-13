import { IValidateResetPasswordTokenDto } from '@application/dtos/auth/validate-reset-password-token.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IValidateResetPasswordTokenResponse } from '@domain/types/auth.types';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class ValidateResetPasswordTokenUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    data: IValidateResetPasswordTokenDto,
  ): Promise<IValidateResetPasswordTokenResponse> {
    try {
      return await this.clientProxy.send<
        IValidateResetPasswordTokenDto,
        IValidateResetPasswordTokenResponse
      >({
        messagePattern: EAuthSubjects.VALIDATE_RESET_PASSWORD_TOKEN,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
