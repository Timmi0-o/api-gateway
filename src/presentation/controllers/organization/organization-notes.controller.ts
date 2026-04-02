import { IGetNotesManyQuery } from '@application/dtos/organization/get-notes-many-query.dto';
import { IGetNotesResponseDto } from '@application/dtos/organization/get-notes-response.dto';
import { ICreateNoteBodyDto } from '@application/dtos/organization/note-create-body.dto';
import { INoteEntityDto } from '@application/dtos/organization/note-entity.dto';
import { IUpdateNoteBodyDto } from '@application/dtos/organization/note-update-body.dto';
import { CreateNoteUseCase } from '@application/use-cases/organization-notes/create/create.usecase';
import { DeleteNoteUseCase } from '@application/use-cases/organization-notes/delete/delete.usecase';
import { GetNotesByEntityUseCase } from '@application/use-cases/organization-notes/get-many/get-many.usecase';
import { UpdateNoteUseCase } from '@application/use-cases/organization-notes/update/update.usecase';
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
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Permissions } from '@tourgis/common';

@Controller({ path: 'organization/:organizationId/notes', version: '1' })
export class OrganizationNotesController {
  constructor(
    private readonly getNotesByEntityUseCase: GetNotesByEntityUseCase,
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly updateNoteUseCase: UpdateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.read)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') _organizationId: string,
    @Query() query: IGetNotesManyQuery,
  ): Promise<IGetNotesResponseDto> {
    return this.getNotesByEntityUseCase.execute({ data: query, metadata });
  }

  @Post()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.create)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') _organizationId: string,
    @Body() body: ICreateNoteBodyDto,
  ): Promise<INoteEntityDto> {
    return this.createNoteUseCase.execute({
      data: body,
      metadata,
    });
  }

  @Patch(':noteId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.update)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') _organizationId: string,
    @Param('noteId') noteId: string,
    @Body() body: IUpdateNoteBodyDto,
  ): Promise<INoteEntityDto> {
    return this.updateNoteUseCase.execute({
      data: { noteId, ...body },
      metadata,
    });
  }

  @Delete(':noteId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.delete)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') _organizationId: string,
    @Param('noteId') noteId: string,
  ): Promise<boolean> {
    return this.deleteNoteUseCase.execute({
      data: { noteId },
      metadata,
    });
  }
}
