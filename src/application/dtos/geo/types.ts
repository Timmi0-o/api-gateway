export interface IGeoPoint {
  type: 'Point';
  coordinates: [number, number];
  crs?: {
    type: string;
    properties: { name: string };
  };
}

export type LangRecord = Record<string, string>;
