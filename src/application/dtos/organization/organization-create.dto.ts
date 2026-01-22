export interface ICreateOrganizationDto {
  name: string;
  description?: string;
  ownerId: string;
  isActive?: boolean;
}
