import { IRegisterDto } from '@application/dtos/user/register.dto';
import {
  type IUserValidator,
  USER_VALIDATOR_TOKEN,
} from '@domain/validators/user-validator.interface';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceException } from '@shared/exceptions/service.exception';
import { firstValueFrom } from 'rxjs';

export const Role = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export const Status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING',
  BLOCKED: 'BLOCKED',
} as const;

export const Language = {
  RU: 'RU',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
export type Status = (typeof Status)[keyof typeof Status];
export type Language = (typeof Language)[keyof typeof Language];

interface IRegisterResponse {
  id: string;
  email: string;
  phone?: string | null;
  username: string;
  role: Role;
  status: Status;
  passwordHash: string;
  fullname: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject(USER_VALIDATOR_TOKEN) private userValidator: IUserValidator,
  ) {}

  @Post('register')
  async register(@Body() data: IRegisterDto): Promise<IRegisterResponse> {
    this.userValidator.validateRegister(data);

    try {
      const res = await firstValueFrom(this.authClient.send('auth.register', data));
      return res;
    } catch (err) {
      const errorMessage: string = err?.message;
      throw ServiceException.conflict(errorMessage ?? 'Internal error');
    }
  }
}
