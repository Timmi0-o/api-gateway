import type { ILoginDto } from '@application/dtos/auth/login.dto';
import { ILogoutDto } from '@application/dtos/auth/logout.dto';
import { IRefreshDto } from '@application/dtos/auth/refresh.dto';
import { IResetPasswordDto } from '@application/dtos/auth/reset-password.dto';
import { ISendResetPasswordEmailDto } from '@application/dtos/auth/send-reset-password-email.dto';
import { IValidateResetPasswordTokenDto } from '@application/dtos/auth/validate-reset-password-token.dto';
import { LoginUseCase } from '@application/use-cases/auth/login.usecse';
import { LogoutUseCase } from '@application/use-cases/auth/logout.usecase';
import { RefreshUseCase } from '@application/use-cases/auth/refresh.usecase';
import { ResetPasswordUseCase } from '@application/use-cases/auth/reset-password.usecase';
import { SendResetPasswordEmailUseCase } from '@application/use-cases/auth/send-reset-password-email.usecase';
import { ValidateResetPasswordTokenUseCase } from '@application/use-cases/auth/validate-reset-password-token.usecase';
import {
  ILoginResponse,
  ILogoutResponse,
  IRefreshResponse,
  IResetPasswordResponse,
  ISendResetPasswordEmailResponse,
  IValidateResetPasswordTokenResponse,
} from '@domain/types/auth.types';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { getIpAndUserAgentFromReq } from '@shared/utils/get-ip-and-user-agent-from-req';
import { getUserSourceFromRequest } from '@shared/utils/get-user-source-from-request';
import { Request } from 'express';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly loginUsecase: LoginUseCase,
    private readonly logoutUsecase: LogoutUseCase,
    private readonly refreshUsecase: RefreshUseCase,
    private readonly resetPasswordUsecase: ResetPasswordUseCase,
    private readonly sendResetPasswordEmailUsecase: SendResetPasswordEmailUseCase,
    private readonly validateResetPasswordTokenUsecase: ValidateResetPasswordTokenUseCase,
  ) {}

  @Post('login')
  async login(
    @Body() data: Omit<ILoginDto, 'ipAddress' | 'userAgent'> & { source?: string },
    @Req() request: Request,
  ): Promise<ILoginResponse> {
    const { ipAddress, userAgent } = getIpAndUserAgentFromReq(request, { notFoundErrors: true });

    const source = getUserSourceFromRequest(request);
    data.source = source;

    return this.loginUsecase.execute({ ...data, ipAddress, userAgent });
  }

  @Post('logout')
  async logout(@Body() data: ILogoutDto): Promise<ILogoutResponse> {
    return this.logoutUsecase.execute(data);
  }

  @Post('refresh')
  async refresh(@Body() data: IRefreshDto): Promise<IRefreshResponse> {
    return this.refreshUsecase.execute(data);
  }

  @Post('reset-password')
  async resetPassword(
    @Body() data: Omit<IResetPasswordDto, 'meta'>,
    @Req() request: Request,
  ): Promise<IResetPasswordResponse> {
    const { ipAddress, userAgent } = getIpAndUserAgentFromReq(request, { notFoundErrors: true });

    return this.resetPasswordUsecase.execute({
      ...data,
      meta: {
        ipAddress,
        userAgent,
        location: '', // TODO: локацию потом нужно будет брать из другого микросевиса (GEO)
      },
    });
  }

  @Post('send-reset-password-email')
  async sendResetPasswordEmail(
    @Body() data: ISendResetPasswordEmailDto,
  ): Promise<ISendResetPasswordEmailResponse> {
    return this.sendResetPasswordEmailUsecase.execute(data);
  }

  @Post('validate-reset-password-token')
  async validateResetPasswordToken(
    @Body() data: IValidateResetPasswordTokenDto,
  ): Promise<IValidateResetPasswordTokenResponse> {
    return this.validateResetPasswordTokenUsecase.execute(data);
  }
}
