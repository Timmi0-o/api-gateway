import { IUpdateRegisterRequestBodyDto } from '@application/dtos/organization/register-request-update.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class UpdateRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string } & IUpdateRegisterRequestBodyDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;
    return this.clientProxy.send<typeof data, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_UPDATE,
      data: {
        registerRequestId: data.registerRequestId,
        ...(data.organizationName !== undefined && { organizationName: data.organizationName }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.phone !== undefined && { phone: data.phone }),
        ...(data.name !== undefined && { name: data.name }),
        ...(data.surname !== undefined && { surname: data.surname }),
        ...(data.patronymic !== undefined && { patronymic: data.patronymic }),
        ...(data.comment !== undefined && { comment: data.comment }),
        ...(data.inn !== undefined && { inn: data.inn }),
        ...(data.organizationType !== undefined && { organizationType: data.organizationType }),
        ...(data.modules !== undefined && { modules: data.modules }),
      },
      metadata,
        });
  }
}
