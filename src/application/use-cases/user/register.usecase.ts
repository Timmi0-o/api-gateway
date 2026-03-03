import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRegisterResponse } from '@domain/types/user.types';
import { IUserValidator } from '@domain/validators/user-validator.interface';
import { EAuthSubjects } from '@tourgis/common';

export class RegisterUseCase {
  constructor(
    private readonly userValidator: IUserValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRegisterDto): Promise<IRegisterResponse> {
    console.log('data', data);
    this.userValidator.validateRegister(data);

    const { source, ...restData } = data;

    return this.clientProxy.send<Omit<IRegisterDto, 'source'>, IRegisterResponse>({
      messagePattern: EAuthSubjects.REGISTER,
      data: restData,
      metadata: { source },
    });
  }
}
