import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateRoleUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateRoleDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ id: string }> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send<ICreateRoleDto, { id: string }>({
    messagePattern: EOrganizationSubjects.ROLE_CREATE,
    data,
    metadata,
  });

  return res;
  }
}
