import { CreateOrganizationFilesUseCase } from '@application/use-cases/organization-files/create-many/create-many.usecase';
import { DeleteOrganizationFilesUseCase } from '@application/use-cases/organization-files/delete-many/delete-many.usecase';
import { GetOrganizationFilesUseCase } from '@application/use-cases/organization-files/get-organization-files/get-organization-files.usecase';
import { MoveOrganizationFileUseCase } from '@application/use-cases/organization-files/move/move.usecase';
import { UpdateOrganizationFileUseCase } from '@application/use-cases/organization-files/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Permissions } from '@tourgis/common';
import { IGetOrganizationFilesResponse } from '@tourgis/contracts/dist/files/v1';

@Controller({ path: 'organization/:organizationId/files', version: '1' })
export class OrganizationFilesController {
  constructor(
    private readonly getOrganizationFilesUseCase: GetOrganizationFilesUseCase,
    private readonly createOrganizationFilesUseCase: CreateOrganizationFilesUseCase,
    private readonly updateOrganizationFileUseCase: UpdateOrganizationFileUseCase,
    private readonly moveOrganizationFileUseCase: MoveOrganizationFileUseCase,
    private readonly deleteOrganizationFilesUseCase: DeleteOrganizationFilesUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.read)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: { path?: string; requiredIds?: string; preset?: string },
  ): Promise<IGetOrganizationFilesResponse> {
    const requiredIds = query.requiredIds ? (JSON.parse(query.requiredIds) as string[]) : [];
    return this.getOrganizationFilesUseCase.execute({
      data: {
        path: query.path,
        requiredIds,
        preset: query.preset ?? 'MINIMAL',
        organizationId,
      },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.create)
  @UseInterceptors(FilesInterceptor('files', 10, { limits: { fileSize: 500 * 1024 * 1024 } }))
  async createMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req: any,
  ): Promise<{ success: boolean }> {
    const folderId = req.body?.folderId;

    return this.createOrganizationFilesUseCase.execute({
      data: {
        commonUserId: metadata.commonUserId ?? '',
        organizationId,
        files,
        folderId,
      },
      metadata,
    });
  }

  @Patch(':fileId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.update)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('fileId') fileId: string,
    @Body() body: { fileName?: string; folderId?: string; tags?: string[] },
  ): Promise<{ success: boolean }> {
    return this.updateOrganizationFileUseCase.execute({
      data: {
        organizationId,
        fileId,
        fileName: body.fileName,
        folderId: body.folderId,
        tags: body.tags,
      },
      metadata,
    });
  }

  @Patch(':fileId/move')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.update)
  async move(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('fileId') fileId: string,
    @Body() body: { folderId: string },
  ): Promise<{ success: boolean }> {
    return this.moveOrganizationFileUseCase.execute({
      data: {
        organizationId,
        fileId,
        folderId: body.folderId,
      },
      metadata,
    });
  }

  @Delete()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.delete)
  async deleteMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() body: { filesIds: string[] },
  ): Promise<{ success: boolean }> {
    return this.deleteOrganizationFilesUseCase.execute({
      data: {
        organizationId,
        filesIds: body.filesIds,
      },
      metadata,
    });
  }
}
