import { EntityId } from '@tourgis/contracts';

export interface IUpdateNoteBodyDto {
  content?: string | null;
  fileIds?: EntityId[];
}
