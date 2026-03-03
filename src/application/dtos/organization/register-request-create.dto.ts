export type TOrganizationType = 'FRANCHISE' | 'BUSINESS';
export type TModuleType = 'BOOKING' | 'RENT' | 'TOURISM';

export interface ICreateRegisterRequestDto {
  organizationName: string;
  email: string;
  phone?: string | null;
  name: string;
  surname: string;
  patronymic?: string | null;
  comment?: string | null;
  inn?: string | null;
  organizationType: TOrganizationType;
  modules: TModuleType[];
}
