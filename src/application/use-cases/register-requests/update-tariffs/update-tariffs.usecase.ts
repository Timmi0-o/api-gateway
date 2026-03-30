import { IUpdateRegisterRequestTariffsBodyDto } from '@application/dtos/organization/register-request-update-tariffs.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class UpdateRegisterRequestTariffsUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string } & IUpdateRegisterRequestTariffsBodyDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;
    return this.clientProxy.send<typeof data, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_UPDATE_TARIFFS,
      data,
      metadata,
    });
  }
}
