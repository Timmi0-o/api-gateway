import { IUpdateOrganizationTariffBody } from '@application/dtos/billing/organization-tariffs/update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateOrganizationTariffUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateOrganizationTariffBody & { organizationTariffId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<
      IUpdateOrganizationTariffBody & { organizationTariffId: string },
      unknown
    >({
      messagePattern: EOrganizationSubjects.BILLING_ORGANIZATION_TARIFF_UPDATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
