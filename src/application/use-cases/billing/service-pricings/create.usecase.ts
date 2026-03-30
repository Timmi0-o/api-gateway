import { ICreateServicePricingBody } from '@application/dtos/billing/service-pricings/create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateServicePricingUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateServicePricingBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<ICreateServicePricingBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_PRICING_CREATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
