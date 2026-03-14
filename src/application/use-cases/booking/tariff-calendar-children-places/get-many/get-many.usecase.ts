import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetTariffCalendarChildrenPlacesUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: unknown;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<unknown> {
    const { data, metadata } = params;
    return this.clientProxy.send({
      messagePattern: EOrganizationSubjects.BOOKING_TARIFF_CALENDAR_CHILDREN_PLACE_GET_MANY,
      data,
      metadata,
    });
  }
}
