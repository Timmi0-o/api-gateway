import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetAdminPermissionsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { preset?: string; limit?: number; page?: number };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;

    const res = await this.clientProxy.send({
    messagePattern: EOrganizationSubjects.PERMISSION_GET_MANY,
    data: {
      preset: data.preset ?? 'MINIMAL',
      limit: data?.limit ? +data.limit : 25,
      page: data.page ?? 1,
    },
    metadata,
  });

  return res;
  }
}
