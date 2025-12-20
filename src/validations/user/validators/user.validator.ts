import { Injectable } from '@nestjs/common';
import Ajv, { ErrorObject } from 'ajv';
import { IRegisterDto } from 'src/application/dtos/user/register.dto';
import { IUserValidator } from 'src/domain/validators/user-validator.interface';
import { ServiceException } from 'src/shared/exceptions/service.exception';
import { registerSchema } from '../schemas/register.schema';

const ajv = new Ajv();

const validateRegister = ajv.compile<IRegisterDto>(registerSchema);

@Injectable()
export class UserValidator implements IUserValidator {
  validateRegister(data: IRegisterDto): IRegisterDto {
    if (!validateRegister(data)) {
      throw ServiceException.validation(this.formatErrors(validateRegister.errors));
    }

    return data;
  }

  private formatErrors(errors: ErrorObject[] | null | undefined): Record<string, string[]> {
    const formatted: Record<string, string[]> = {};
    errors?.forEach((error) => {
      const key = error.instancePath.slice(1) || 'root';

      if (!formatted[key]) formatted[key] = [];

      formatted[key].push(error.message ?? 'Validation error (AJV)');
    });

    return formatted;
  }
}
