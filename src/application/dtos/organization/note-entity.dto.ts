import { EntityId } from '@tourgis/contracts';
import { ENoteEntityType } from './note-entity-type.dto';

export interface INoteEntityDto {
  id: EntityId;
  entityId: EntityId;
  entityType: ENoteEntityType;
  authorId: EntityId;
  content: string | null;
  fileIds: EntityId[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
