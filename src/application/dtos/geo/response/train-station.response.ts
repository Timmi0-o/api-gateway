import { IGeoPoint } from '@application/dtos/geo/types';

export interface ITrainStationResponse {
  id: string;
  slug: string;
  regionId: string | null;
  localityId: string | null;
  coordinates: IGeoPoint | null;
  name: string;
  direction: string | null;
  codes: Record<string, unknown> | null;
  title: string | null;
  descriptions: string | null;
  metaDescriptions: string | null;
  metaKeywords: string | null;
  createdAt: string;
  updatedAt: string;
}
