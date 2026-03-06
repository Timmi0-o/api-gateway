import {
  EOrganizationType,
  ICreateOrganizationDto,
} from '@application/dtos/organization/organization-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { ServiceException } from '@shared/exceptions/service.exception';
import { EAuthSubjects, EOrganizationSubjects } from '@tourgis/common';
import { IAuthUserDto } from '@tourgis/contracts/dist/auth/v1';
import { IOrganizationDto, IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

export class ApproveRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;

    const registerRequest = (
      await this.clientProxy.send<unknown, { data: IRegisterRequestDto }>({
        messagePattern: EOrganizationSubjects.REGISTER_REQUEST_GET_ONE,
        data: { registerRequestId: data.registerRequestId, preset: 'BASE' },
        metadata,
      })
    )?.data;

    if (!registerRequest) {
      throw ServiceException.entityNotFound('REGISTER_REQUEST_NOT_FOUND');
    }

    if (registerRequest.status !== 'PENDING') {
      throw ServiceException.conflict('REGISTER_REQUEST_ALREADY_PROCESSED');
    }

    const password = crypto.randomBytes(6).toString('base64url');
    const passwordHash = await bcrypt.hash(password, 10);

    let companyOwnerId: string | null = null;

    const existingUser = (
      await this.clientProxy.send<unknown, { data: IAuthUserDto[] }>({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          preset: 'BASE',
          filters: {
            email: {
              value: [registerRequest.email],
            },
            source: {
              value: [registerRequest.organizationType],
            },
          },
        },
        metadata,
      })
    )?.data?.[0];

    if (existingUser?.id) {
      companyOwnerId = existingUser.id;
    } else {
      const username = crypto.randomBytes(6).toString('base64url');

      await this.clientProxy.send<unknown, { data: IAuthUserDto }>({
        messagePattern: EAuthSubjects.USER_CREATE,
        data: {
          email: registerRequest.email,
          username,
          name: registerRequest.name,
          surname: registerRequest.surname,
          patronymic: registerRequest.patronymic ?? null,
          phone: registerRequest.phone ?? null,
          source: registerRequest.organizationType,
          identityScopeKey: registerRequest.organizationType,
          passwordHash,
          role: 'AGENT',
          status: 'ACTIVE',
          language: 'RU',
        },
        metadata,
      });
    }

    const userForOwner = (
      await this.clientProxy.send<
        unknown,
        { data: (IAuthUserDto & { organizationUser: { id: string } })[] }
      >({
        messagePattern: EAuthSubjects.GET_USERS,
        data: {
          preset: 'BASE',
          filters: {
            email: {
              value: [registerRequest.email],
            },
            source: {
              value: [registerRequest.organizationType],
            },
          },
        },
        metadata,
      })
    )?.data?.[0];

    if (!userForOwner) {
      throw ServiceException.conflict('REGISTER_REQUEST_NOT_APPROVED (USER_FOR_OWNER_NOT_FOUND)');
    }

    companyOwnerId = userForOwner.organizationUser.id;

    if (!companyOwnerId) {
      throw ServiceException.conflict('REGISTER_REQUEST_NOT_APPROVED (COMPANY_OWNER_NOT_FOUND)');
    }

    const createOrgPayload: ICreateOrganizationDto = {
      name: registerRequest.organizationName,
      organizationType: registerRequest.organizationType as EOrganizationType,
      ownerId: companyOwnerId,
      isActive: true,
    };

    const createdOrganization = await this.clientProxy.send<unknown, IOrganizationDto>({
      messagePattern: EOrganizationSubjects.ORGANIZATION_CREATE,
      data: createOrgPayload,
      metadata,
    });

    await this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CHANGE_STATUS,
      data: {
        registerRequestId: data.registerRequestId,
        status: 'APPROVED',
        commonUserId: metadata.commonUserId,
      },
      metadata,
    });

    return this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_UPDATE,
      data: {
        registerRequestId: data.registerRequestId,
        ownerStartedCredentials: { email: registerRequest.email, password },
        organizationId: createdOrganization.id,
      },
      metadata,
    });
  }
}
