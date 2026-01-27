import { GetOneUserUseCase } from '@application/use-cases/user/get-one/get-one.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get-usecase/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update/update.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import { IUserValidator, USER_VALIDATOR_TOKEN } from '@domain/validators/user-validator.interface';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from '@presentation/controllers/user/user.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';
import { ValidatorsModule } from '../../validations/validators.module';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.AUTH_CLIENT), ValidatorsModule],
  controllers: [UserController],
  providers: [
    {
      provide: RegisterUseCase,
      useFactory: (userValidator: IUserValidator, clientProxy: IMicroserviceClientProxyService) => {
        return new RegisterUseCase(userValidator, clientProxy);
      },
      inject: [USER_VALIDATOR_TOKEN, MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetUsersUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetUsersUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOneUserUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new GetOneUserUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateUserUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => {
        return new UpdateUserUseCase(clientProxy);
      },
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class UserUsecaseModule {}
