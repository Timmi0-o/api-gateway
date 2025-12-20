import { LoginUseCase } from '@application/use-cases/auth/login.usecse';
import { LogoutUseCase } from '@application/use-cases/auth/logout.usecase';
import { RefreshUseCase } from '@application/use-cases/auth/refresh.usecase';
import { ResetPasswordUseCase } from '@application/use-cases/auth/reset-password.usecase';
import { SendResetPasswordEmailUseCase } from '@application/use-cases/auth/send-reset-password-email.usecase';
import { ValidateResetPasswordTokenUseCase } from '@application/use-cases/auth/validate-reset-password-token.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { AUTH_VALIDATOR_TOKEN, IAuthValidator } from '@domain/validators/auth-validator.interface';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { AuthController } from '@presentation/controllers/auth/auth.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { ValidatorsModule } from '../../validations/validators.module';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.AUTH_CLIENT), ValidatorsModule],
  controllers: [AuthController],
  providers: [
    {
      provide: LoginUseCase,
      useFactory: (authValidator: IAuthValidator, clientProxy: IMicroserviceClientProxyService) => {
        return new LoginUseCase(authValidator, clientProxy);
      },
      inject: [AUTH_VALIDATOR_TOKEN, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: LogoutUseCase,
      useFactory: (authValidator: IAuthValidator, clientProxy: IMicroserviceClientProxyService) => {
        return new LogoutUseCase(authValidator, clientProxy);
      },
      inject: [AUTH_VALIDATOR_TOKEN, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: RefreshUseCase,
      useFactory: (authValidator: IAuthValidator, clientProxy: IMicroserviceClientProxyService) => {
        return new RefreshUseCase(authValidator, clientProxy);
      },
      inject: [AUTH_VALIDATOR_TOKEN, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: ResetPasswordUseCase,
      useFactory: (authValidator: IAuthValidator, clientProxy: IMicroserviceClientProxyService) => {
        return new ResetPasswordUseCase(authValidator, clientProxy);
      },
      inject: [AUTH_VALIDATOR_TOKEN, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SendResetPasswordEmailUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new SendResetPasswordEmailUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: ValidateResetPasswordTokenUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new ValidateResetPasswordTokenUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class AuthUsecaseModule {}
