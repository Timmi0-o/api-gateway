export enum EOrganizationType {
  FRANCHISE = 'FRANCHISE', // Франшиза
  BUSINESS = 'BUSINESS ', // Бизнес
}

export interface ICreateOrganizationDto {
  name: string;
  description?: string;
  organizationType: EOrganizationType;
  ownerId: string;
  isActive?: boolean;
}
