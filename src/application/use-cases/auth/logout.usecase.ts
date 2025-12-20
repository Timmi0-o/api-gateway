import { ILogoutDto } from '@application/dtos/auth/logout.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ILogoutResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class LogoutUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: ILogoutDto): Promise<ILogoutResponse> {
    this.authValidator.validateLogout(data);

    try {
      return await this.clientProxy.send<ILogoutDto, ILogoutResponse>({
        messagePattern: RPC_PATTERNS.auth.logout,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
