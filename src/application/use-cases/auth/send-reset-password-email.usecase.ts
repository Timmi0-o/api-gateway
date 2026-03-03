import { ISendResetPasswordEmailDto } from '@application/dtos/auth/send-reset-password-email.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ISendResetPasswordEmailResponse } from '@domain/types/auth.types';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EAuthSubjects } from '@tourgis/common';

export class SendResetPasswordEmailUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ISendResetPasswordEmailDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<ISendResetPasswordEmailResponse> {
    const { data, metadata } = params;

    return await this.clientProxy.send<
    ISendResetPasswordEmailDto & { identityScopeKey: string },
    ISendResetPasswordEmailResponse
  >({
    messagePattern: EAuthSubjects.SEND_RESET_PASSWORD_EMAIL,
    data: { ...data, identityScopeKey: metadata.identityScopeKey as string },
    metadata,
    })
  }
}
