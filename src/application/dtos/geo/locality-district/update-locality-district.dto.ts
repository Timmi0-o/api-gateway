import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IUpdateLocalityDistrictDto {
  slug: string;
  regionId?: string;
  localityId?: string;
  countryId?: string;
  coordinates?: IGeoPoint;
  name?: LangRecord;
  descriptions?: LangRecord;
  metaTitle?: LangRecord;
  metaDescriptions?: LangRecord;
  metaKeywords?: LangRecord;
}
