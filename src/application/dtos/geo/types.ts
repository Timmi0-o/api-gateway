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

export interface IListResponseMeta {
  total: number;
  totalCount: number;
  offset: number;
  limit: number;
  page: number;
}

export interface IListResponse<T> {
  data: T[];
  meta: IListResponseMeta;
}
