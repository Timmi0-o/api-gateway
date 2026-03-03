import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class DeleteRegisterRequestsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestIds: string[] };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<number> {
    const { data, metadata } = params;
    return this.clientProxy.send<{ registerRequestIds: string[] }, number>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_DELETE,
      data: { registerRequestIds: data.registerRequestIds },
      metadata,
        });
  }
}
