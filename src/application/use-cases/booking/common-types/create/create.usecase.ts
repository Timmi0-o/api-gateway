import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateCommonTypeUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: unknown;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;
    return this.clientProxy.send({
      messagePattern: EOrganizationSubjects.BOOKING_COMMON_TYPE_CREATE,
      data,
      metadata,
    });
  }
}
