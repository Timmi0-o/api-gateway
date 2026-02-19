import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface ICreateRegionDto {
  countryId: string;
  code?: string;
  coordinates?: IGeoPoint;
  name: LangRecord;
  descriptions: LangRecord;
  metaTitle: LangRecord;
  metaDescriptions: LangRecord;
  metaKeywords: LangRecord;
}
