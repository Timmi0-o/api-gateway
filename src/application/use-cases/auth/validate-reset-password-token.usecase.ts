import { IValidateResetPasswordTokenDto } from '@application/dtos/auth/validate-reset-password-token.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IValidateResetPasswordTokenResponse } from '@domain/types/auth.types';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EAuthSubjects } from '@tourgis/common';

export class ValidateResetPasswordTokenUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IValidateResetPasswordTokenDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IValidateResetPasswordTokenResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<
    IValidateResetPasswordTokenDto,
    IValidateResetPasswordTokenResponse
  >({
    messagePattern: EAuthSubjects.VALIDATE_RESET_PASSWORD_TOKEN,
    data,
    metadata,
    })
  }
}
