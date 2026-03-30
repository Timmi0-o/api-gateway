import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetDiscountUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { discountId: string; preset?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<{ discountId: string; preset?: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_DISCOUNT_GET_ONE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
