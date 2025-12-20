import { IValidateResetPasswordTokenDto } from '@application/dtos/auth/validate-reset-password-token.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IValidateResetPasswordTokenResponse } from '@domain/types/auth.types';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

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
        messagePattern: RPC_PATTERNS.auth.validateResetPasswordToken,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
