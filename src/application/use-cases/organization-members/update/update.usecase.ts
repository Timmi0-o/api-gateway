import { IUpdateOrganizationMemberDto } from '@application/dtos/organization/organization-member-update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateOrganizationMemberUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: Omit<IUpdateOrganizationMemberDto, 'commonUserId'>,
  ): Promise<unknown> {
    try {
      const res = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_UPDATE,
        data: {
          commonUserId: metadata.commonUserId,
          organizationId: data.organizationId,
          userId: data.userId,
          roleId: data.roleId,
          ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
        },
        metadata: { ...metadata },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
