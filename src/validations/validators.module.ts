import { Module } from '@nestjs/common';
import { AUTH_VALIDATOR_TOKEN } from 'src/domain/validators/auth-validator.interface';
import { USER_VALIDATOR_TOKEN } from 'src/domain/validators/user-validator.interface';
import { AuthValidator } from './auth/validators/auth.validator';
import { UserValidator } from './user/validators/user.validator';

@Module({
  providers: [
    {
      provide: AUTH_VALIDATOR_TOKEN,
      useClass: AuthValidator,
    },
    {
      provide: USER_VALIDATOR_TOKEN,
      useClass: UserValidator,
    },
  ],
  exports: [AUTH_VALIDATOR_TOKEN, USER_VALIDATOR_TOKEN],
})
export class ValidatorsModule {}
