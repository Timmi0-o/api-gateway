import { IPaginationMeta } from '@tourgis/contracts';
import { INoteWithFilesDto } from './note-with-files.dto';

export interface IGetNotesResponseDto {
  notes: INoteWithFilesDto[];
  meta: IPaginationMeta;
}
