import { ICreateServiceBody } from '@application/dtos/billing/services/create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateBillingServiceUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateServiceBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<ICreateServiceBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_CREATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
