export interface ICreateUnitDto {
  propertyId: string;
  typeId: string;
  status: string;
  priority: number;
  name: string;
  shortDescription: string;
  description: string;
  unitArea: object;
  roomCount: number;
  places: number;
  additionalPlaces: number;
  childrenWithoutPlaces: number;
  petsPolicyMode: string;
  petsPolicyOverride?: object | null;
}

export type IUpdateUnitDto = Partial<ICreateUnitDto>;
