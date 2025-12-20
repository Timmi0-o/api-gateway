import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IRegisterResponse } from '@domain/types/user.types';
import { IUserValidator } from '@domain/validators/user-validator.interface';
import { RPC_PATTERNS } from '@shared/constants/rpc-patternts';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';

export class RegisterUseCase {
  constructor(
    private readonly userValidator: IUserValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(data: IRegisterDto): Promise<IRegisterResponse> {
    this.userValidator.validateRegister(data);

    try {
      return await this.clientProxy.send<IRegisterDto, IRegisterResponse>({
        messagePattern: RPC_PATTERNS.auth.register,
        data,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
