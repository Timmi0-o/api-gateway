import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetOrganizationTariffUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { organizationTariffId: string; preset?: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<{ organizationTariffId: string; preset?: string }, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_ORGANIZATION_TARIFF_GET_ONE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
