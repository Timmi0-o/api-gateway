export enum EOrganizationType {
  FRANCHIZE = 'FRANCHIZE', // Франшиза
  BUSINESS = 'FRANCHIZE ', // Бизнес
}

export interface ICreateOrganizationDto {
  name: string;
  description?: string;
  organizarionType: EOrganizationType;
  ownerId: string;
  isActive?: boolean;
}
