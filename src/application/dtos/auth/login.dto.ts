export enum EUserSource {
  TOURGIS = 'TOURGIS',
  ADMIN = 'ADMIN',
  BUSINESS = 'BUSINESS',
  FRANCHISE = 'FRANCHISE',
}

export interface ILoginDto {
  username: string;
  password: string;
  ipAddress: string;
  userAgent: string;
  fingerprint: string;
  source: EUserSource;
}
