export interface IResetPasswordDto {
  token: string;
  password: string;
  meta: {
    ipAddress: string;
    userAgent: string;
    location: string;
  };
}
