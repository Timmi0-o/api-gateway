import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IUpdateRegionDto {
  slugOrId: string;
  countryId?: string;
  code?: string;
  coordinates?: IGeoPoint;
  name?: LangRecord;
  descriptions?: LangRecord;
  metaTitle?: LangRecord;
  metaDescriptions?: LangRecord;
  metaKeywords?: LangRecord;
}
