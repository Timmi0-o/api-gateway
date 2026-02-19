import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface ICreateCountryDto {
  coordinates: IGeoPoint | null;
  name: LangRecord;
  descriptions: LangRecord;
  metaTitle: LangRecord;
  metaDescriptions: LangRecord;
  metaKeywords: LangRecord;
}
