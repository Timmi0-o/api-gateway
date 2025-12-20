import { ILoginDto } from 'src/application/dtos/auth/login.dto';
import { ILogoutDto } from 'src/application/dtos/auth/logout.dto';
import { IRefreshDto } from 'src/application/dtos/auth/refresh.dto';
import { IResetPasswordDto } from 'src/application/dtos/auth/reset-password.dto';

export const AUTH_VALIDATOR_TOKEN = Symbol('AUTH_VALIDATOR');

export interface IAuthValidator {
  validateLogin(data: ILoginDto): ILoginDto;
  validateRefresh(data: IRefreshDto): IRefreshDto;
  validateLogout(data: ILogoutDto): ILogoutDto;
  validateResetPassword(data: IResetPasswordDto): IResetPasswordDto;
}
