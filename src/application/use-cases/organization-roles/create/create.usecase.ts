import { ICreateRoleDto } from '@application/dtos/organization/role-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateRoleUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: { commonUserId: string; isStaffUser: boolean },
    data: ICreateRoleDto,
  ): Promise<{ id: string }> {
    try {
      const res = await this.clientProxy.send<ICreateRoleDto, { id: string }>({
        messagePattern: EOrganizationSubjects.ROLE_CREATE,
        data,
        metadata: metadata,
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
