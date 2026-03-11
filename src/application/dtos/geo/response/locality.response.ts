import { IGeoPoint } from '@application/dtos/geo/types';

export interface ILocalityResponse {
  id: string;
  countryId: string;
  regionId: string;
  slug: string;
  type: number;
  main: boolean;
  coordinates: IGeoPoint | null;
  name: string;
  descriptions: string | null;
  metaTitle: string | null;
  metaDescriptions: string | null;
  metaKeywords: string | null;
  createdAt: string;
  updatedAt: string;
}
