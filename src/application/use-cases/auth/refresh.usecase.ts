import { IRefreshDto } from '@application/dtos/auth/refresh.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRefreshResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class RefreshUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRefreshDto): Promise<IRefreshResponse> {
    this.authValidator.validateRefresh(data);

    try {
      return await this.clientProxy.send<IRefreshDto, IRefreshResponse>({
        messagePattern: EAuthSubjects.REFRESH,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
