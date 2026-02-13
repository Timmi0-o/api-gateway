import { IAddOrganizationMemberDto } from '@application/dtos/organization/organization-member-add.dto';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
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

  async execute(params: {
    data: IAddOrganizationMemberDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<{ success: boolean }> {
    const { data, metadata } = params;

    try {
      const organization: IQueryOrganizationsDataResponse = await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_GET_ONE,
        metadata,
        data: {
          organizationId: data.organizationId,
          preset: 'SHORT',
        },
      });

      if (!organization) {
        throw ServiceException.entityNotFound('ORGANIZATION_NOT_FOUND');
      }

      const existUser: IQueryAuthUsersDataResponse = await this.clientProxy.send({
        messagePattern: EAuthSubjects.GET_USERS,
        metadata,
        data: {
          preset: 'MINIMAL',
          filter: {
            email: data.email,
            phone: data.phone,
            // @ts-expect-error: any
            source: organization.data.organizationType,
          },
        },
      });

      if (!existUser) {
        await this.registerUseCase.execute({
          ...data,
          // @ts-expect-error: any
          source: organization.data.organizationType,
        });
      }

      const user: any = await this.clientProxy.send({
        messagePattern: EAuthSubjects.GET_USERS,
        metadata,
        data: {
          filter: {
            email: data.email,
            phone: data.phone,
            // @ts-expect-error: any
            source: organization.data.organizationType,
          },
          preset: 'BASE',
        },
      });

      await this.clientProxy.send({
        messagePattern: EOrganizationSubjects.ORGANIZATION_MEMBER_CREATE,
        metadata,
        data: {
          // @ts-expect-error: any
          organizationId: organization.data.id,
          commonUserId: metadata.commonUserId,
          userId: user.data[0].organizationUser.id,
          roleId: data.roleId,
        },
      });

      return { success: true };
    } catch (err) {
      throw ExceptionWIthFormatRpcCode(err);
    }
  }
}
