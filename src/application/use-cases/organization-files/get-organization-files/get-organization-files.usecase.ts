import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
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

    const normalizedQuery = splitArrayQueryParams({ preset: data.preset });

    const payload: INormalizedArrayQuery & {
      path?: string;
      requiredIds: string[];
      organizationId: string;
    } = {
      ...normalizedQuery,
      path: data.path,
      requiredIds: data.requiredIds ?? [],
      organizationId: data.organizationId,
    };

    return this.clientProxy.send<
      INormalizedArrayQuery & {
        path?: string;
        requiredIds: string[];
        organizationId: string;
      },
      IGetOrganizationFilesResponse
    >({
      messagePattern: EOrganizationSubjects.ORGANIZATION_FILE_GET_MANY,
      data: payload,
      metadata,
    });
  }
}
