import { IDeleteRoleDto } from '@application/dtos/organization/role-delete.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class DeleteRoleUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IDeleteRoleDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send<IDeleteRoleDto, { success: boolean }>({
    messagePattern: EOrganizationSubjects.ROLE_DELETE,
    data,
    metadata,
  });

  return res;
  }
}
