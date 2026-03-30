import { ICreateOrganizationTariffLineBody } from '@application/dtos/billing/organization-tariff-lines/create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateOrganizationTariffLineUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateOrganizationTariffLineBody;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    return this.clientProxy.send<ICreateOrganizationTariffLineBody, unknown>({
      messagePattern: EOrganizationSubjects.BILLING_ORGANIZATION_TARIFF_LINE_CREATE,
      data: params.data,
      metadata: params.metadata,
    });
  }
}
