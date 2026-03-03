import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IGetOrganizationFilesResponse } from '@tourgis/contracts/dist/files/v1';

export interface IGetOrganizationFilesData {
  path?: string;
  requiredIds: string[];
  preset: string;
  organizationId: string;
}

export class GetOrganizationFilesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetOrganizationFilesData;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IGetOrganizationFilesResponse> {
    const { data, metadata } = params;

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
    metadata,
  });

  return res;
  }
}
