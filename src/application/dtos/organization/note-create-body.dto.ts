import { EntityId } from '@tourgis/contracts';
import { ENoteEntityType } from './note-entity-type.dto';

export interface ICreateNoteBodyDto {
  entityId: EntityId;
  entityType: ENoteEntityType;
  content?: string | null;
  fileIds?: EntityId[];
}
