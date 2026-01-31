import { IAddOrganizationMemberDto } from '@application/dtos/organization/organization-member-add.dto';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { ServiceException } from '@shared/exceptions/service.exception';
import { ExceptionWIthFormatRpcCode } from '@shared/utils/exception-with-fromat-rpc-code';
import { EAuthSubjects, EOrganizationSubjects } from '@tourgis/common';
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';
import { IQueryOrganizationsDataResponse } from '@tourgis/contracts/dist/organization/v1';

export class AddMemberUseCase {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly clientProxy: IMicroserviceClientProxyService,
  ) {}

  async execute(
    commonUserId: string,
    data: IAddOrganizationMemberDto,
  ): Promise<{ success: boolean }> {
    try {
      const organization: IQueryOrganizationsDataResponse = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_ONE,
        metadata: { commonUserId },
        data: {
          organizationId: data.organizationId,
          select: ['id', 'organizationType'],
        },
      });

      if (!organization) {
        throw ServiceException.entityNotFound('ORGANIZATION_NOT_FOUND');
      }

      const existUser: IQueryAuthUsersDataResponse = await this.clientProxy.send({
        messagePattern: EAuthSubjects.GET_USERS,
        metadata: { commonUserId },
        data: {
          select: ['id'],
          filter: {
            email: data.email,
            phone: data.phone,
            // @ts-expect-error: any
            source: organization.data.organizationType,
          },
        },
      });

      if (!existUser?.data?.[0]?.auth?.id) {
        await this.registerUseCase.execute({
          email: data.email,
          phone: data.phone,
          username: data.username,
          password: data.password,
          name: data.name,
          surname: data.surname,
          patronymic: data.patronymic,
          // @ts-expect-error: any
          source: organization.data.organizationType,
        });
      }

      const user = await this.clientProxy.send({
        messagePattern: EAuthSubjects.GET_USERS,
        metadata: { commonUserId },
        data: {
          filter: {
            email: data.email,
            phone: data.phone,
            // @ts-expect-error: any
            source: organization.data.organizationType,
          },
          select: ['id'],
          include: {
            organization: true,
          },
        },
      });

      await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_CREATE,
        metadata: { commonUserId },
        data: {
          // @ts-expect-error: any
          organizationId: organization.data.id,
          commonUserId,
          // @ts-expect-error: any
          userId: data.userId ?? user.data[0].organization.id,
          roleId: data.roleId,
        },
      });

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
