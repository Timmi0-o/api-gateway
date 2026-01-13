import { IJwtService } from '@domain/services/i-jwt.service';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async verify(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verify(token, { algorithms: ['HS256'], secret: 'secret-token' });
  }

  decode(token: string): Record<string, unknown> {
    return this.jwtService.decode(token);
  }
}
