import { ICreateOrganizationTariffBody } from '@application/dtos/billing/organization-tariffs/create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateOrganizationTariffUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateOrganizationTariffBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<ICreateOrganizationTariffBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_ORGANIZATION_TARIFF_CREATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
