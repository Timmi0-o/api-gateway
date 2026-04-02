import { ENoteEntityType } from '@application/dtos/organization/note-entity-type.dto';
import { INoteEntityDto } from '@application/dtos/organization/note-entity.dto';
import { ICreateNoteBodyDto } from '@application/dtos/organization/note-create-body.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class CreateNoteUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: ICreateNoteBodyDto;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<INoteEntityDto> {
    const { data, metadata } = params;

    const payload: {
      entityId: string;
      entityType: ENoteEntityType;
      content?: string | null;
      fileIds?: string[];
    } = {
      entityId: data.entityId,
      entityType: data.entityType,
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.fileIds !== undefined ? { fileIds: data.fileIds } : {}),
    };

    return this.clientProxy.send<typeof payload, INoteEntityDto>({
      messagePattern: EOrganizationSubjects.NOTE_CREATE,
      data: payload,
      metadata,
    });
  }
}
