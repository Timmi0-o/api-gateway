import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ENoteEntityType } from './note-entity-type.dto';

/** Query GET /organization/:organizationId/notes (список заметок по сущности) */
export type IGetNotesManyQuery = IRawArrayQuery & {
  entityId: string;
  entityType: ENoteEntityType;
};
