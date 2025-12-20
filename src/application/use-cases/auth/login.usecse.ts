import { ILoginDto } from '@application/dtos/auth/login.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ILoginResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class LoginUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: ILoginDto): Promise<ILoginResponse> {
    this.authValidator.validateLogin(data);

    try {
      return await this.clientProxy.send<ILoginDto, ILoginResponse>({
        messagePattern: RPC_PATTERNS.auth.login,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
