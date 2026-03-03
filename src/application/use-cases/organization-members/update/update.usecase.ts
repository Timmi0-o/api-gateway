import { IUpdateOrganizationMemberDto } from '@application/dtos/organization/organization-member-update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateOrganizationMemberUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: Omit<IUpdateOrganizationMemberDto, 'commonUserId'>;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_UPDATE,
    data: {
      commonUserId: metadata.commonUserId,
      organizationId: data.organizationId,
      userId: data.userId,
      roleId: data.roleId,
      ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
    },
    metadata,
  });

  return res;
  }
}
