import { ILoginDto } from '@application/dtos/auth/login.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ILoginResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class LoginUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: ILoginDto): Promise<ILoginResponse> {
    console.log('data', data);
    this.authValidator.validateLogin(data);

    try {
      return await this.clientProxy.send<ILoginDto, ILoginResponse>({
        messagePattern: EAuthSubjects.LOGIN,
        data,
      });
    } catch (err) {
      console.log('err', err);
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
