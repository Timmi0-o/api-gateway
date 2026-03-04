import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class RejectRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string; rejectionReason?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;

    return this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CHANGE_STATUS,
      data: {
        registerRequestId: data.registerRequestId,
        status: 'REJECTED',
        ...(data.rejectionReason !== undefined && { rejectionReason: data.rejectionReason }),
        commonUserId: metadata.commonUserId,
      },
      metadata,
    });
  }
}
