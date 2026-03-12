import { CreateOrganizationFilesUseCase } from '@application/use-cases/organization-files/create-many/create-many.usecase';
import { DeleteOrganizationFilesUseCase } from '@application/use-cases/organization-files/delete-many/delete-many.usecase';
import { GetOrganizationFilesUseCase } from '@application/use-cases/organization-files/get-organization-files/get-organization-files.usecase';
import { MoveOrganizationFileUseCase } from '@application/use-cases/organization-files/move/move.usecase';
import { UpdateOrganizationFileUseCase } from '@application/use-cases/organization-files/update/update.usecase';
import { CreateOrganizationFolderUseCase } from '@application/use-cases/organization-folders/create/create.usecase';
import { DeleteOrganizationFolderUseCase } from '@application/use-cases/organization-folders/delete/delete.usecase';
import { MoveOrganizationFolderUseCase } from '@application/use-cases/organization-folders/move/move.usecase';
import { UpdateOrganizationFolderUseCase } from '@application/use-cases/organization-folders/update/update.usecase';
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
import { ApproveRegisterRequestUseCase } from '@application/use-cases/register-requests/approve/approve.usecase';
import { ChangeRegisterRequestStatusUseCase } from '@application/use-cases/register-requests/change-status/change-status.usecase';
import { CreateRegisterRequestUseCase } from '@application/use-cases/register-requests/create/create.usecase';
import { DeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/delete/delete.usecase';
import { GetRegisterRequestsUseCase } from '@application/use-cases/register-requests/get-many/get-many.usecase';
import { GetRegisterRequestUseCase } from '@application/use-cases/register-requests/get-one/get-one.usecase';
import { RejectRegisterRequestUseCase } from '@application/use-cases/register-requests/reject/reject.usecase';
import { SoftDeleteRegisterRequestsUseCase } from '@application/use-cases/register-requests/soft-delete/soft-delete.usecase';
import { UpdateRegisterRequestUseCase } from '@application/use-cases/register-requests/update/update.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { FileUploadService } from '@infrastructure/services/file-upload/file-upload.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { OrganizationFilesController } from '@presentation/controllers/organization/organization-files.controller';
import { OrganizationFoldersController } from '@presentation/controllers/organization/organization-folders.controller';
import { MembersController } from '@presentation/controllers/organization/organization-members.controller';
import { OrganizationModulesController } from '@presentation/controllers/organization/organization-modules.controller';
import { OrganizationPermissionsController } from '@presentation/controllers/organization/organization-permissions.controller';
import { OrganizationController } from '@presentation/controllers/organization/organization.controller';
import { RegisterRequestsController } from '@presentation/controllers/organization/register-requests.controller';
import { RoleController } from '@presentation/controllers/organization/role.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { S3Module } from './s3.module';
import { UserUsecaseModule } from './user.module';

@Module({
  imports: [
    MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT),
    UserUsecaseModule,
    S3Module,
  ],
  controllers: [
    RegisterRequestsController,
    OrganizationController,
    MembersController,
    RoleController,
    OrganizationPermissionsController,
    OrganizationModulesController,
    OrganizationFilesController,
    OrganizationFoldersController,
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
      useFactory: (
        clientProxy: IMicroserviceClientProxyService,
        getOrganizationRolesUseCase: GetOrganizationRolesUseCase,
        createRoleUseCase: CreateRoleUseCase,
      ) => {
        return new CreateRolePermissionsUseCase(
          clientProxy,
          getOrganizationRolesUseCase,
          createRoleUseCase,
        );
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE, GetOrganizationRolesUseCase, CreateRoleUseCase],
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
    {
      provide: GetOrganizationFilesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOrganizationFilesUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationFilesUseCase,
      useFactory: (
        clientProxy: IMicroserviceClientProxyService,
        fileUploadService: FileUploadService,
      ) => {
        return new CreateOrganizationFilesUseCase(clientProxy, fileUploadService);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE, FileUploadService],
    },
    {
      provide: UpdateOrganizationFileUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateOrganizationFileUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: MoveOrganizationFileUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new MoveOrganizationFileUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteOrganizationFilesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new DeleteOrganizationFilesUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationFolderUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateOrganizationFolderUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateOrganizationFolderUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateOrganizationFolderUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: MoveOrganizationFolderUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new MoveOrganizationFolderUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteOrganizationFolderUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new DeleteOrganizationFolderUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetRegisterRequestUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetRegisterRequestUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetRegisterRequestsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetRegisterRequestsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateRegisterRequestUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new CreateRegisterRequestUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateRegisterRequestUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateRegisterRequestUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: ChangeRegisterRequestStatusUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new ChangeRegisterRequestStatusUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteRegisterRequestsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new DeleteRegisterRequestsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeleteRegisterRequestsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new SoftDeleteRegisterRequestsUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: ApproveRegisterRequestUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new ApproveRegisterRequestUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: RejectRegisterRequestUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new RejectRegisterRequestUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class OrganizationUsecaseModule {}
