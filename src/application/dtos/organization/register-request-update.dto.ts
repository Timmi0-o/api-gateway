import { TOrganizationType, TModuleType } from './register-request-create.dto';

export interface IUpdateRegisterRequestBodyDto {
  organizationName?: string;
  email?: string;
  phone?: string | null;
  name?: string;
  surname?: string;
  patronymic?: string | null;
  comment?: string | null;
  inn?: string | null;
  organizationType?: TOrganizationType;
  modules?: TModuleType[];
}
