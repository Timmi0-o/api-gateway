import { IRefreshDto } from '@application/dtos/auth/refresh.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRefreshResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class RefreshUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRefreshDto): Promise<IRefreshResponse> {
    this.authValidator.validateRefresh(data);

    try {
      return await this.clientProxy.send<IRefreshDto, IRefreshResponse>({
        messagePattern: RPC_PATTERNS.auth.refresh,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
