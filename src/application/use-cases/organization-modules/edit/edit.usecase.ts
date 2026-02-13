import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';

export interface IEditOrganizationModulesDto {
  added: string[];
  deleted: string[];
}

export class EditOrganizationModulesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { organizationId: string } & IEditOrganizationModulesDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    try {
      if (data.added?.length) {
        await this.clientProxy.send({
          messagePattern: EOrganizationSubjects.ORGANIZATION_MODULE_ADD,
          data: {
            organizationId: data.organizationId,
            modules: data.added,
          },
          metadata,
        });
      }

      if (data.deleted?.length) {
        await this.clientProxy.send({
          messagePattern: EOrganizationSubjects.ORGANIZATION_MODULE_REMOVE,
          data: {
            organizationId: data.organizationId,
            modules: data.deleted,
          },
          metadata,
        });
      }

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
