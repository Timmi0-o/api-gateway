import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface IDistrictRegionResponse {
  id: string;
  countryId: string | null;
  regionId: string;
  slug: string;
  coordinates: IGeoPoint | null;
  name: LangRecord;
  descriptions: LangRecord | null;
  metaTitle: LangRecord | null;
  metaDescriptions: LangRecord | null;
  metaKeywords: LangRecord | null;
  createdAt: string;
  updatedAt: string;
}
