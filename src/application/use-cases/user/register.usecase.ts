import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRegisterResponse } from '@domain/types/user.types';
import { IUserValidator } from '@domain/validators/user-validator.interface';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class RegisterUseCase {
  constructor(
    private readonly userValidator: IUserValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRegisterDto): Promise<IRegisterResponse> {
    this.userValidator.validateRegister(data);

    try {
      return await this.clientProxy.send<IRegisterDto, IRegisterResponse>({
        messagePattern: EAuthSubjects.REGISTER,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
