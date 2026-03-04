import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IPaginationMeta } from '@tourgis/contracts';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class GetRegisterRequestsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: {
      preset?: string;
      filter?: string;
      orderBy?: string;
      limit?: number;
      page?: number;
      registerRequestId?: string;
    };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ data: IRegisterRequestDto[]; meta: IPaginationMeta }> {
    const { data, metadata } = params;
    const payload = {
      preset: data.preset ?? 'MINIMAL',
      ...(data.filter ? { filter: JSON.parse(data.filter) } : {}),
      ...(data.orderBy ? { orderBy: JSON.parse(data.orderBy) } : {}),
      ...(data.limit != null ? { limit: data.limit } : {}),
      ...(data.page != null ? { page: data.page } : {}),
    };

    return this.clientProxy.send<
      typeof payload,
      { data: IRegisterRequestDto[]; meta: IPaginationMeta }
    >({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_GET_MANY,
      data: payload,
      metadata,
    });
  }
}
