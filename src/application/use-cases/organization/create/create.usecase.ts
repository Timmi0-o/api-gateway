import { ICreateOrganizationDto } from '@application/dtos/organization/organization-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateOrganizationUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(commonUserId: string, data: ICreateOrganizationDto): Promise<boolean> {
    try {
      const res = await this.clientProxy.send<ICreateOrganizationDto, boolean>({
        messagePattern: EOrganizationSubjects.ORGANIZATION_CREATE,
        data,
        metadata: {
          commonUserId,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
