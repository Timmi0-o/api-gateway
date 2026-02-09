import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EOrganizationSubjects } from '@tourgis/common';
import { IGetOrganizationFilesResponse } from '@tourgis/contracts/dist/files/v1';

export interface IGetOrganizationFilesMetadata {
  commonUserId: string;
  isStaffUser: boolean;
  systemRole: string;
}

export interface IGetOrganizationFilesData {
  path?: string;
  requiredIds: string[];
  preset: string;
  organizationId: string;
}

export class GetOrganizationFilesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(
    metadata: IGetOrganizationFilesMetadata,
    data: IGetOrganizationFilesData,
  ): Promise<IGetOrganizationFilesResponse> {
    try {
      const res = await this.clientProxy.send<
        IGetOrganizationFilesData,
        IGetOrganizationFilesResponse
      >({
        messagePattern: EOrganizationSubjects.ORGANIZATION_FILE_GET_MANY,
        data: {
          path: data.path,
          requiredIds: data.requiredIds ?? [],
          preset: data.preset ?? 'MINIMAL',
          organizationId: data.organizationId,
        },
        metadata: {
          commonUserId: metadata.commonUserId,
          isStaffUser: metadata.isStaffUser,
          systemRole: metadata.systemRole,
        },
      });

      return res;
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
