import { AddMemberUseCase } from '@application/use-cases/organization-members/add-member/add-member.usecase';
import { GetMembersUseCase } from '@application/use-cases/organization-members/get-members/get-members.usecase';
import { CreateRolePermissionsUseCase } from '@application/use-cases/organization-roles/create-permissions/create-permissions.usecase';
import { CreateRoleUseCase } from '@application/use-cases/organization-roles/create/create.usecase';
import { DeleteRoleUseCase } from '@application/use-cases/organization-roles/delete/delete.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import { CreateOrganizationUseCase } from '@application/use-cases/organization/create/create.usecase';
import { GetOneOrganizationUseCase } from '@application/use-cases/organization/get-one/get-one.usecase';
import { GetOrganizationsUseCase } from '@application/use-cases/organization/get/get.usecase';
import { UpdateOrganizationUseCase } from '@application/use-cases/organization/update/update.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { MembersController } from '@presentation/controllers/organization/members.controller';
import { OrganizationController } from '@presentation/controllers/organization/organization.controller';
import { RoleController } from '@presentation/controllers/organization/role.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { UserUsecaseModule } from './user.module';

@Module({
  imports: [
    MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT),
    UserUsecaseModule,
  ],
  controllers: [OrganizationController, MembersController, RoleController],
  providers: [
    {
      provide: GetOrganizationsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetUsersUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOneOrganizationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOneOrganizationUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateOrganizationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateOrganizationUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateOrganizationUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetMembersUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetMembersUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: AddMemberUseCase,
      useFactory: (
        registerUseCase: RegisterUseCase,
        clientProxy: IMicroserviceClientProxyService,
      ) => {
        return new AddMemberUseCase(registerUseCase, clientProxy);
      },
      inject: [RegisterUseCase, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationRolesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationRolesUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateRoleUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateRoleUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateRolePermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateRolePermissionsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteRoleUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new DeleteRoleUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class OrganizationUsecaseModule {}
