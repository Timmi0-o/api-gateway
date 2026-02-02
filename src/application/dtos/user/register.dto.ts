export interface IRegisterDto {
  email: string;
  phone?: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  source: string;
  identityScopeKey: string;
}
