import { ICreateOrganizationDto } from '@application/dtos/organization/organization-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateOrganizationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateOrganizationDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<boolean> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send<ICreateOrganizationDto, boolean>({
    messagePattern: EOrganizationSubjects.ORGANIZATION_CREATE,
    data,
    metadata,
  });

  return res;
  }
}
