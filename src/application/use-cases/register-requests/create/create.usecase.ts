import { ICreateRegisterRequestDto } from '@application/dtos/organization/register-request-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class CreateRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(data: ICreateRegisterRequestDto): Promise<IRegisterRequestDto> {
    return this.clientProxy.send<ICreateRegisterRequestDto, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CREATE,
      data,
        });
  }
}
