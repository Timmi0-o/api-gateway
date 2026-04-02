import { IFileDto } from '@tourgis/contracts/dist/files/v1';
import { INoteEntityDto } from './note-entity.dto';

export type INoteWithFilesDto = Omit<INoteEntityDto, 'fileIds'> & {
  files?: IFileDto[];
};
