export interface ICreateAddressDto {
  entityId: string;
  entityType: string;
  countryId?: string | null;
  regionId?: string | null;
  districtRegionId?: string | null;
  localityId?: string | null;
  localityDistrictId?: string | null;
}
