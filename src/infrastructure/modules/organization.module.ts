import { AddMemberUseCase } from '@application/use-cases/organization-members/add-member/add-member.usecase';
import { DeleteOrganizationMemberUseCase } from '@application/use-cases/organization-members/delete/delete.usecase';
import { GetMembersUseCase } from '@application/use-cases/organization-members/get-members/get-members.usecase';
import { GetOneOrganizationMemberUseCase } from '@application/use-cases/organization-members/get-one/get-one.usecase';
import { UpdateOrganizationMemberUseCase } from '@application/use-cases/organization-members/update/update.usecase';
import { EditOrganizationModulesUseCase } from '@application/use-cases/organization-modules/edit/edit.usecase';
import { GetOrganizationModulesUseCase } from '@application/use-cases/organization-modules/get-modules/get-modules.usecase';
import { CreateRolePermissionsUseCase } from '@application/use-cases/organization-permissions/create/create-permissions.usecase';
import { GetOrganizationPermissionsUseCase } from '@application/use-cases/organization-permissions/get/get-permissions.usecase';
import { CreateRoleUseCase } from '@application/use-cases/organization-roles/create/create.usecase';
import { DeleteRoleUseCase } from '@application/use-cases/organization-roles/delete/delete.usecase';
import { GetOneOrganizationRoleUseCase } from '@application/use-cases/organization-roles/get-one/get-one.usecase';
import { GetOrganizationRolesUseCase } from '@application/use-cases/organization-roles/get/get.usecase';
import { UpdateRoleUseCase } from '@application/use-cases/organization-roles/update/update.usecase';
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
import { MembersController } from '@presentation/controllers/organization/organization-members.controller';
import { OrganizationModulesController } from '@presentation/controllers/organization/organization-modules.controller';
import { OrganizationPermissionsController } from '@presentation/controllers/organization/organization-permissions.controller';
import { OrganizationController } from '@presentation/controllers/organization/organization.controller';
import { RoleController } from '@presentation/controllers/organization/role.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { UserUsecaseModule } from './user.module';

@Module({
  imports: [
    MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT),
    UserUsecaseModule,
  ],
  controllers: [
    OrganizationController,
    MembersController,
    RoleController,
    OrganizationPermissionsController,
    OrganizationModulesController,
  ],
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
      provide: GetOneOrganizationMemberUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOneOrganizationMemberUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateOrganizationMemberUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateOrganizationMemberUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteOrganizationMemberUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new DeleteOrganizationMemberUseCase(clientProxy);
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
      provide: GetOneOrganizationRoleUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOneOrganizationRoleUseCase(clientProxy);
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
    {
      provide: UpdateRoleUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateRoleUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationPermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationPermissionsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationModulesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationModulesUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: EditOrganizationModulesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new EditOrganizationModulesUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class OrganizationUsecaseModule {}
