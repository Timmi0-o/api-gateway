import { INoteEntityDto } from '@application/dtos/organization/note-entity.dto';
import { IUpdateNoteBodyDto } from '@application/dtos/organization/note-update-body.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class UpdateNoteUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IUpdateNoteBodyDto & { noteId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<INoteEntityDto> {
    const { data, metadata } = params;

    const payload: {
      noteId: string;
      content?: string | null;
      fileIds?: string[];
    } = {
      noteId: data.noteId,
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.fileIds !== undefined ? { fileIds: data.fileIds } : {}),
    };

    return this.clientProxy.send<typeof payload, INoteEntityDto>({
      messagePattern: EOrganizationSubjects.NOTE_UPDATE,
      data: payload,
      metadata,
    });
  }
}
