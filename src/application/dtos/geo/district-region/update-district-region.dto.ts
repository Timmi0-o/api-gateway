import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IUpdateDistrictRegionDto {
  slugOrId: string;
  regionId?: string;
  countryId?: string;
  coordinates?: IGeoPoint;
  name?: LangRecord;
  descriptions?: LangRecord;
  metaTitle?: LangRecord;
  metaDescriptions?: LangRecord;
  metaKeywords?: LangRecord;
}
