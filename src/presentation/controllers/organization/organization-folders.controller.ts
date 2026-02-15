import { CreateOrganizationFolderUseCase } from '@application/use-cases/organization-folders/create/create.usecase';
import { DeleteOrganizationFolderUseCase } from '@application/use-cases/organization-folders/delete/delete.usecase';
import { MoveOrganizationFolderUseCase } from '@application/use-cases/organization-folders/move/move.usecase';
import { UpdateOrganizationFolderUseCase } from '@application/use-cases/organization-folders/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Permissions } from '@tourgis/common';

@Controller({ path: 'organization/:organizationId/folders', version: '1' })
export class OrganizationFoldersController {
  constructor(
    private readonly createOrganizationFolderUseCase: CreateOrganizationFolderUseCase,
    private readonly updateOrganizationFolderUseCase: UpdateOrganizationFolderUseCase,
    private readonly moveOrganizationFolderUseCase: MoveOrganizationFolderUseCase,
    private readonly deleteOrganizationFolderUseCase: DeleteOrganizationFolderUseCase,
  ) {}

  @Post()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.create)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: { name: string; parentId?: string; allowedPurposes?: string[] },
  ): Promise<{ success: boolean }> {
    return this.createOrganizationFolderUseCase.execute({
      data: {
        organizationId,
        name: body.name,
        parentId: body.parentId,
        allowedPurposes: body.allowedPurposes,
      },
      metadata,
    });
  }

  @Patch(':folderId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.update)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('folderId') folderId: string,
    @Body() body: { name?: string; systemType?: string | null; allowedPurposes?: string[] },
  ): Promise<{ success: boolean }> {
    return this.updateOrganizationFolderUseCase.execute({
      data: {
        organizationId,
        folderId,
        name: body.name,
        systemType: body.systemType,
        allowedPurposes: body.allowedPurposes,
      },
      metadata,
    });
  }

  @Patch(':folderId/move')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.update)
  async move(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('folderId') folderId: string,
    @Body() body: { parentId: string },
  ): Promise<{ success: boolean }> {
    return this.moveOrganizationFolderUseCase.execute({
      data: {
        organizationId,
        folderId,
        parentId: body.parentId,
      },
      metadata,
    });
  }

  @Delete(':folderId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.delete)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('folderId') folderId: string,
  ): Promise<{ success: boolean }> {
    return this.deleteOrganizationFolderUseCase.execute({
      data: {
        organizationId,
        folderId,
      },
      metadata,
    });
  }
}
