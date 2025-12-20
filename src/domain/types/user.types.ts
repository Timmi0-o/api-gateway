export interface IRegisterResponse {
  id: string;
  email: string;
  phone?: string | null;
  username: string;
  role: string;
  status: string;
  passwordHash: string;
  fullname: string;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}
