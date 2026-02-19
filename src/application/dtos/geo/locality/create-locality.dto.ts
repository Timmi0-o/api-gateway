import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface ICreateLocalityDto {
  countryId: string;
  regionId: string;
  type: number;
  main: boolean;
  coordinates?: IGeoPoint;
  name: LangRecord;
  descriptions: LangRecord;
  metaTitle: LangRecord;
  metaDescriptions: LangRecord;
  metaKeywords: LangRecord;
}
