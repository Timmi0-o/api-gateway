import { IGetNotesManyQuery } from '@application/dtos/organization/get-notes-many-query.dto';
import { IGetNotesResponseDto } from '@application/dtos/organization/get-notes-response.dto';
import { ENoteEntityType } from '@application/dtos/organization/note-entity-type.dto';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IMetadataObjectForGrpcRequest } from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import {
  INormalizedArrayQuery,
  splitArrayQueryParams,
} from '@shared/utils/split-array-query-params';
import { EOrganizationSubjects } from '@tourgis/common';

export class GetNotesByEntityUseCase {
  constructor(private readonly clientProxy: IMicroserviceClientProxyService) {}

  async execute(params: {
    data: IGetNotesManyQuery;
    metadata: IMetadataObjectForGrpcRequest;
  }): Promise<IGetNotesResponseDto> {
    const { entityId, entityType, ...arrayQuery } = params.data;

    const normalizedQuery = splitArrayQueryParams(arrayQuery);

    const payload: INormalizedArrayQuery & {
      entityId: string;
      entityType: ENoteEntityType;
    } = {
      ...normalizedQuery,
      entityId,
      entityType,
    };

    return this.clientProxy.send<
      INormalizedArrayQuery & { entityId: string; entityType: ENoteEntityType },
      IGetNotesResponseDto
    >({
      messagePattern: EOrganizationSubjects.NOTE_GET_MANY_BY_ENTITY_TYPE_AND_ENTITY_ID,
      data: payload,
      metadata: params.metadata,
    });
  }
}
