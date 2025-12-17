import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ServiceException } from '@shared/exceptions/service.exception';
import { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import type { ILoginDto } from 'src/application/dtos/auth/login.dto';
import {
  AUTH_VALIDATOR_TOKEN,
  type IAuthValidator,
} from 'src/domain/validators/auth-validator.interface';

interface ILoginResponse {
  sid: string;
  accessToken: string;
}

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    @Inject(AUTH_VALIDATOR_TOKEN) private authValidator: IAuthValidator,
  ) {}

  @Post('login')
  async login(
    @Body() data: Omit<ILoginDto, 'ipAddress' | 'userAgent'>,
    @Req() request: Request,
  ): Promise<ILoginResponse | null> {
    const ipAddress = request.ip ?? '';
    const userAgent = request.headers['user-agent'] ?? '';

    if (!ipAddress || !userAgent) {
      throw ServiceException.validation({
        ipAddress: !ipAddress ? ['Missing IP address'] : [],
        userAgent: !userAgent ? ['Missing user agent'] : [],
      });
    }

    this.authValidator.validateLogin({
      ...data,
      ipAddress,
      userAgent,
    });

    try {
      const res: ILoginResponse = await firstValueFrom<ILoginResponse>(
        this.authClient.send('auth.login', {
          ...data,
          ipAddress,
          userAgent,
        }),
      );

      return res;
    } catch (err) {
      const errorMessage: string = err?.message;
      throw ServiceException.conflict(errorMessage ?? 'Internal error');
    }
  }
}
