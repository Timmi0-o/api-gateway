import { Module } from '@nestjs/common';
import { MicroservicesModule } from 'src/infrastructure/modules/microservices.module';
import { ValidatorsModule } from 'src/validations/validators.module';
import { AuthController } from './auth/auth.controller';
import { RootController } from './root.controller';
import { UserController } from './user/user.controller';

@Module({
  imports: [MicroservicesModule, ValidatorsModule],
  controllers: [RootController, AuthController, UserController],
})
export class ControllersModule {}
