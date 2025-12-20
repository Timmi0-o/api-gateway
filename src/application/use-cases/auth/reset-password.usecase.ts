import { IResetPasswordDto } from '@application/dtos/auth/reset-password.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IResetPasswordResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class ResetPasswordUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IResetPasswordDto): Promise<IResetPasswordResponse> {
    this.authValidator.validateResetPassword(data);

    try {
      return await this.clientProxy.send<IResetPasswordDto, IResetPasswordResponse>({
        messagePattern: RPC_PATTERNS.auth.resetPassword,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
