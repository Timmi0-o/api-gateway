import { Injectable } from '@nestjs/common';
import Ajv, { ErrorObject } from 'ajv';
import { ILoginDto } from 'src/application/dtos/auth/login.dto';
import { ILogoutDto } from 'src/application/dtos/auth/logout.dto';
import { IRefreshDto } from 'src/application/dtos/auth/refresh.dto';
import { IAuthValidator } from 'src/domain/validators/auth-validator.interface';
import { ServiceException } from 'src/shared/exceptions/service.exception';
import { loginSchema } from '../schemas/login.schema';
import { logoutSchema } from '../schemas/logout.schema';
import { refreshSchema } from '../schemas/refresh.schema';

const ajv = new Ajv();

const validateLogin = ajv.compile<ILoginDto>(loginSchema);
const validateRefresh = ajv.compile<IRefreshDto>(refreshSchema);
const validateLogout = ajv.compile<ILogoutDto>(logoutSchema);

@Injectable()
export class AuthValidator implements IAuthValidator {
  validateLogin(data: ILoginDto): ILoginDto {
    if (!validateLogin(data)) {
      throw ServiceException.validation(this.formatErrors(validateLogin.errors));
    }

    return data;
  }

  validateRefresh(data: IRefreshDto): IRefreshDto {
    if (!validateRefresh(data)) {
      throw ServiceException.validation(this.formatErrors(validateRefresh.errors));
    }

    return data;
  }

  validateLogout(data: ILogoutDto): ILogoutDto {
    if (!validateLogout(data)) {
      throw ServiceException.validation(this.formatErrors(validateLogout.errors));
    }

    return data;
  }

  private formatErrors(errors: ErrorObject[] | null | undefined): Record<string, string[]> {
    const formatted: Record<string, string[]> = {};
    errors?.forEach((error) => {
      const key = error.instancePath.slice(1) || 'root';

      if (!formatted[key]) formatted[key] = [];

      formatted[key].push(error.message ?? 'Validation error (AJV');
    });

    return formatted;
  }
}
