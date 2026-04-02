import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { EOrganizationSubjects } from '@tourgis/common';

export class DeleteNoteUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: { noteId: string };
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<boolean> {
    const { data, metadata } = params;

    return this.clientProxy.send<{ noteId: string }, boolean>({
      messagePattern: EOrganizationSubjects.NOTE_DELETE,
      data: { noteId: data.noteId },
      metadata,
    });
  }
}
