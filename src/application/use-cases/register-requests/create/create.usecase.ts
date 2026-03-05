import { ICreateAddressDto } from '@application/dtos/geo/address/create-address.dto';
import { IAddress } from '@application/dtos/geo/response/address.response';
import { ICreateRegisterRequestDto } from '@application/dtos/organization/register-request-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { Logger } from '@nestjs/common';
import { ServiceException } from '@shared/exceptions/service.exception';
import { EAddressEntityType, EGeoSubjects, EOrganizationSubjects } from '@tourgis/common';
import { IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';

export class CreateRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(data: ICreateRegisterRequestDto): Promise<IRegisterRequestDto> {
    const { localityId, ...createRequestPayload } = data;

    const registerRequest = await this.clientProxy.send<
      Omit<ICreateRegisterRequestDto, 'localityId'>,
      { data: IRegisterRequestDto }
    >({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CREATE,
      data: createRequestPayload,
    });

    if (!registerRequest.data.id) {
      throw ServiceException.conflict('REGISTER_REQUEST_NOT_CREATED');
    }

    const address = await this.clientProxy.send<ICreateAddressDto, IAddress>({
      messagePattern: EGeoSubjects.ADDRESS_CREATE,
      data: {
        entityId: registerRequest.data.id,
        entityType: EAddressEntityType.ORGANIZATION_REGISTER_REQUEST,
        localityId,
      },
      metadata: {
        isStaff: true,
      },
    });

    if (!address.localityId) {
      Logger.warn('Address not created', { address });
    }

    return registerRequest.data;
  }
}
