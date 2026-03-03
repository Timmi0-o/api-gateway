import { ILogoutDto } from '@application/dtos/auth/logout.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ILogoutResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { EAuthSubjects } from '@tourgis/common';

export class LogoutUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: ILogoutDto): Promise<ILogoutResponse> {
    this.authValidator.validateLogout(data);

    return await this.clientProxy.send<ILogoutDto, ILogoutResponse>({
    messagePattern: EAuthSubjects.LOGOUT,
    data,
    })
  }
}
