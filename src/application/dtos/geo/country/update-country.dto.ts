import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IUpdateCountryDto {
  slug: string;
  coordinates?: IGeoPoint;
  name?: LangRecord;
  descriptions?: LangRecord;
  metaTitle?: LangRecord;
  metaDescriptions?: LangRecord;
  metaKeywords?: LangRecord;
}
