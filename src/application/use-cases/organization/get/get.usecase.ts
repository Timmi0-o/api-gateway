import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export class GetOrganizationsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      filter?: string;
      limit?: number;
      page?: number;
      include?: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IOrganizationsDataResponse> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send<unknown, IQueryOrganizationsDataResponse>({
    messagePattern: EOrganizationSubjects.ORGANIZATION_GET_MANY,
    data: {
      ...data,
      filter: data.filter ? JSON.parse(data.filter) : undefined,
      limit: data?.limit ? +data.limit : 25,
      page: data.page ?? 1,
    },
    metadata,
  });

  // return getOrganizationsFormatResultData({ data: res });
  return res as unknown as IOrganizationsDataResponse;
  }
}
