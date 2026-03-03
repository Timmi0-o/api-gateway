export interface IAddress {
  entityId: string;
  entityType: string;
  countryId: string | null;
  regionId: string | null;
  districtRegionId: string | null;
  localityId: string | null;
  localityDistrictId: string | null;
  createdAt: string;
  updatedAt: string;
}
