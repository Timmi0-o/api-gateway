import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class SoftDeleteDiscountUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { discountId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<{ discountId: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_DISCOUNT_SOFT_DELETE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
