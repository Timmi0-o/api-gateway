import { IUpdateDiscountBody } from '@application/dtos/billing/discounts/update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateDiscountUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateDiscountBody & { discountId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<IUpdateDiscountBody & { discountId: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_DISCOUNT_UPDATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
