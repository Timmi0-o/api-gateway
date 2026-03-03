import { IRefreshDto } from '@application/dtos/auth/refresh.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRefreshResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { EAuthSubjects } from '@tourgis/common';

export class RefreshUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRefreshDto): Promise<IRefreshResponse> {
    this.authValidator.validateRefresh(data);

    return await this.clientProxy.send<IRefreshDto, IRefreshResponse>({
    messagePattern: EAuthSubjects.REFRESH,
    data,
    })
  }
}
