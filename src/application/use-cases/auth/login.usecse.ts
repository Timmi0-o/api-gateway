import { ILoginDto } from '@application/dtos/auth/login.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ILoginResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { UserCacheDataService } from '@infrastructure/services/user-cache-data/user-cache-data.service';
import { EAuthSubjects } from '@tourgis/common';

export class LoginUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
    private readonly userCacheDataService: UserCacheDataService,
  ) {}

  async execute(data: ILoginDto): Promise<ILoginResponse> {
    this.authValidator.validateLogin(data);

    const response = await this.clientProxy.send<ILoginDto, ILoginResponse>({
      messagePattern: EAuthSubjects.LOGIN,
      data,
    });

    await this.userCacheDataService.fillUserPermissionsForAllOrganizations(
      response.data.commonUserId,
    );

    return response;
  }
}
