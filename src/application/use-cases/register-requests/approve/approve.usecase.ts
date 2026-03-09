import {
  EOrganizationType,
  ICreateOrganizationDto,
} from '@application/dtos/organization/organization-create.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Logger } from '@nestjs/common';
import { ServiceException } from '@shared/exceptions/service.exception';
import { clearPhone } from '@shared/utils/clear-phone';
import { EAuthSubjects, EOrganizationSubjects } from '@tourgis/common';
import { IAuthUserDto } from '@tourgis/contracts/dist/auth/v1';
import { IOrganizationDto, IRegisterRequestDto } from '@tourgis/contracts/dist/organization/v1';
import * as crypto from 'crypto';

export class ApproveRegisterRequestUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { registerRequestId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IRegisterRequestDto> {
    const { data, metadata } = params;

    Logger.log(`Получение заявки на регистрацию: ${data.registerRequestId}`);
    const registerRequest = (
      await this.clientProxy.send<unknown, { data: IRegisterRequestDto }>({
        messagePattern: EOrganizationSubjects.REGISTER_REQUEST_GET_ONE,
        data: { registerRequestId: data.registerRequestId, preset: 'BASE' },
        metadata,
      })
    )?.data;

    if (!registerRequest) {
      Logger.error('REGISTER_REQUEST_NOT_FOUND');
      throw ServiceException.entityNotFound('REGISTER_REQUEST_NOT_FOUND');
    }

    Logger.log(`Статус заявки: ${registerRequest.status}`);
    if (registerRequest.status !== 'PENDING') {
      Logger.error('REGISTER_REQUEST_ALREADY_PROCESSED');
      throw ServiceException.conflict('REGISTER_REQUEST_ALREADY_PROCESSED');
    }

    Logger.log(`Генерация пароля для пользователя: ${registerRequest.email}`);
    const password = crypto.randomBytes(6).toString('base64url');

    let companyOwnerId: string | null = null;

    Logger.log(
      `Проверка наличия пользователя с email: ${registerRequest.email}, organizationType: ${registerRequest.organizationType}`,
    );
    const existingUser = (
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

    if (existingUser?.id) {
      Logger.log(
        `Пользователь существует. ID: ${existingUser.id}. Проверяем компании, которыми он владеет...`,
      );
      const existCompanyWithExistUser = await this.clientProxy.send<
        unknown,
        { success: boolean; data: { name: string } }
      >({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_BY_OWNER,
        data: {
          ownerId: existingUser.id,
          preset: 'BASE',
        },
        metadata: {
          ...metadata,
          isStaffUser: true,
        } as IMetadataObjectForGrpcRequest,
      });

      if (existCompanyWithExistUser?.success) {
        Logger.error(
          `Данный пользователь уже является владельцем компании типа ${registerRequest.organizationType} (${existCompanyWithExistUser?.data?.name})`,
        );
        throw ServiceException.conflict(
          'Данный пользователь уже является владельцем компании типа ' +
            registerRequest.organizationType +
            ' (' +
            existCompanyWithExistUser?.data?.name +
            ')',
        );
      }

      companyOwnerId = existingUser.id;
      Logger.log(
        `Используем существующего пользователя как владельца компании. OwnerID: ${companyOwnerId}`,
      );
    } else {
      Logger.log(`Пользователь не найден. Создаем нового пользователя: ${registerRequest.email}`);
      const username = crypto.randomBytes(6).toString('base64url');

      await this.clientProxy.send<unknown, { data: IAuthUserDto }>({
        messagePattern: EAuthSubjects.USER_CREATE,
        data: {
          email: registerRequest.email,
          username,
          name: registerRequest.name,
          surname: registerRequest.surname,
          patronymic: registerRequest.patronymic ?? null,
          phone: clearPhone(registerRequest.phone),
          source: registerRequest.organizationType,
          identityScopeKey: registerRequest.organizationType,
          password,
          role: 'AGENT',
          status: 'ACTIVE',
          language: 'RU',
        },
        metadata,
      });
      Logger.log(`Пользователь успешно создан: ${registerRequest.email}`);
    }

    Logger.log(`Получаем пользователя для владельца компании...`);
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
      Logger.error('REGISTER_REQUEST_NOT_APPROVED (USER_FOR_OWNER_NOT_FOUND)');
      throw ServiceException.conflict('REGISTER_REQUEST_NOT_APPROVED (USER_FOR_OWNER_NOT_FOUND)');
    }

    companyOwnerId = userForOwner.organizationUser.id;

    if (!companyOwnerId) {
      Logger.error('REGISTER_REQUEST_NOT_APPROVED (COMPANY_OWNER_NOT_FOUND)');
      throw ServiceException.conflict('REGISTER_REQUEST_NOT_APPROVED (COMPANY_OWNER_NOT_FOUND)');
    }

    Logger.log(`Создаем компанию с ownerId: ${companyOwnerId}`);
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
    Logger.log(`Компания создана. ID: ${createdOrganization?.id}`);

    Logger.log(`Меняем статус заявки на 'APPROVED'...`);
    await this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_CHANGE_STATUS,
      data: {
        registerRequestId: data.registerRequestId,
        status: 'APPROVED',
        commonUserId: metadata.commonUserId,
      },
      metadata,
    });
    Logger.log('Статус заявки успешно изменён на APPROVED');

    Logger.log('Обновляем заявку с учетными данными владельца и id созданной организации...');
    const updatedRequest = await this.clientProxy.send<unknown, IRegisterRequestDto>({
      messagePattern: EOrganizationSubjects.REGISTER_REQUEST_UPDATE,
      data: {
        registerRequestId: data.registerRequestId,
        ownerStartedCredentials: { email: registerRequest.email, password },
        organizationId: createdOrganization.id,
      },
      metadata,
    });
    Logger.log('Заявка успешно обновлена и завершена');

    return updatedRequest;
  }
}
