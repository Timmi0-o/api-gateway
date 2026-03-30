import { ICreateDiscountBody } from '@application/dtos/billing/discounts/create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateDiscountUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateDiscountBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<ICreateDiscountBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_DISCOUNT_CREATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
