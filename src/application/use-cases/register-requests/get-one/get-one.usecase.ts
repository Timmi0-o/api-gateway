import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class GetRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string; preset?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;
    return this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_GET_ONE,
      data: {
        registerRequestId: data.registerRequestId,
        preset: data.preset ?? 'MINIMAL',
      },
      metadata,
    });
  }
}
