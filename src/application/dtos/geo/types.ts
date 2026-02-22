export interface IGeoPoint {
  type: 'Point';
  coordinates: [number, number];
  crs?: {
    type: string;
    properties: { name: string };
  };
}

export type LangRecord = Record<string, string>;

export interface ITransportBase {
  regionId?: string;
  localityId?: string;
  coordinates?: IGeoPoint | null;
  name: string;
  direction?: string | null;
  codes?: Record<string, unknown> | null;
  title?: string | null;
  descriptions?: string | null;
  metaDescriptions?: string | null;
  metaKeywords?: string | null;
}
