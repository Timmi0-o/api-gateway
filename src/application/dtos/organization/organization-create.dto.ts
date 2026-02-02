export enum EOrganizationType {
  FRANCHISE = 'FRANCHISE', // Франшиза
  BUSINESS = 'BUSINESS ', // Бизнес
}

export interface ICreateOrganizationDto {
  name: string;
  description?: string;
  organizarionType: EOrganizationType;
  ownerId: string;
  isActive?: boolean;
}
