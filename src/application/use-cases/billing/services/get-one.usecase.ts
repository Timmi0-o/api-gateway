import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetBillingServiceUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { serviceId: string; preset?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    console.log({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_GET_ONE,
      data: params.data,
      metadata: params.metadata,
    });

    return this.clientProxy.send<{ serviceId: string; preset?: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_GET_ONE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
