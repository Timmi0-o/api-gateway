export interface ILoginResponse {
  sid: string;
  accessToken: string;
}

export interface IRefreshResponse {
  accessToken: string;
}

export interface ILogoutResponse {
  success: boolean;
}

export interface IResetPasswordResponse {
  success: boolean;
}

export interface ISendResetPasswordEmailResponse {
  success: boolean;
}

export interface IValidateResetPasswordTokenResponse {
  success: boolean;
}
