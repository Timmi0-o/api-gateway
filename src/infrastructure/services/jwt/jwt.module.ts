import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    NestJwtModule.register({
      publicKey: fs.readFileSync(path.join(process.cwd(), 'keys', 'jwt_public.pem'), 'utf-8'),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService, NestJwtModule],
})
export class JwtModule {}
