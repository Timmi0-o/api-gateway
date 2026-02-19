import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IUpdateRegionDto {
  slug: string;
  countryId?: string;
  code?: string;
  coordinates?: IGeoPoint;
  name?: LangRecord;
  descriptions?: LangRecord;
  metaTitle?: LangRecord;
  metaDescriptions?: LangRecord;
  metaKeywords?: LangRecord;
}
