import { IGeoPoint, LangRecord } from '@application/dtos/geo/types';

export interface ILocalityResponse {
  id: string;
  countryId: string;
  regionId: string;
  slug: string;
  type: number;
  main: boolean;
  coordinates: IGeoPoint | null;
  name: LangRecord;
  descriptions: LangRecord | null;
  metaTitle: LangRecord | null;
  metaDescriptions: LangRecord | null;
  metaKeywords: LangRecord | null;
  createdAt: string;
  updatedAt: string;
}
