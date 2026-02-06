export interface ILoginResponse {
  success: boolean;
  data: {
    sid: string;
    accessToken: string;
    commonUserId: string;
  };
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
