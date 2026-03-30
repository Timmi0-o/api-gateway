import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class SoftDeleteServicePricingUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { servicePricingId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<{ servicePricingId: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_PRICING_SOFT_DELETE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
