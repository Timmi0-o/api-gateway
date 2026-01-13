import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '../jwt/jwt.module';
import { RsaTokenService } from './rsa-token.service';
import { RsaTokenStrategy } from './rsa-token.strategy';

@Module({
  imports: [PassportModule, JwtModule],
  providers: [RsaTokenService, RsaTokenStrategy],
  exports: [RsaTokenService, RsaTokenStrategy, PassportModule, JwtModule],
})
export class AuthServiceModule {}
