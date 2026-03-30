import { IDeleteServicesBody } from '@application/dtos/billing/services/delete-many.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class DeleteBillingServicesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteServicesBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<IDeleteServicesBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_SERVICE_DELETE_MANY,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
