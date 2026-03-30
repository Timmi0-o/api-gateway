import { IUpdateServiceBody } from '@application/dtos/billing/services/update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateBillingServiceUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateServiceBody & { serviceId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<IUpdateServiceBody & { serviceId: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_UPDATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
