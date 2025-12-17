import { IRegisterDto } from 'src/application/dtos/user/register.dto';

export const USER_VALIDATOR_TOKEN = Symbol('USER_VALIDATOR');

export interface IUserValidator {
  validateRegister(data: IRegisterDto): IRegisterDto;
}
