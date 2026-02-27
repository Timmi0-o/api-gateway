import { IResetPasswordDto } from '@application/dtos/auth/reset-password.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IResetPasswordResponse } from '@domain/types/auth.types';
import { IAuthValidator } from '@domain/validators/auth-validator.interface';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects } from '@tourgis/common';

export class ResetPasswordUseCase {
  constructor(
    private readonly authValidator: IAuthValidator,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(params: {
    data: IResetPasswordDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IResetPasswordResponse> {
    const { data, metadata } = params;

    this.authValidator.validateResetPassword(data);

    try {
      return await this.clientProxy.send<IResetPasswordDto, IResetPasswordResponse>({
        messagePattern: EAuthSubjects.RESET_PASSWORD,
        data,
        metadata,
      });
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
