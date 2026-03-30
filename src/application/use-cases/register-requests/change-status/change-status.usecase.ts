import { IChangeRegisterRequestStatusBodyDto } from '@application/dtos/organization/register-request-change-status.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class ChangeRegisterRequestStatusUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string } & IChangeRegisterRequestStatusBodyDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;

    console.log('data', data);
    return this.clientProxy.send<
      {
        registerRequestId: string;
        status: string;
        rejectionReason?: string;
      },
      IRegisterRequestDto
    >({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CHANGE_STATUS,
      data,
      metadata,
    });
  }
}
