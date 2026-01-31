import { IJwtService } from '@domain/services/i-jwt.service';
import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { ServiceException } from '@shared/exceptions/service.exception';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async verify(token: string): Promise<Record<string, unknown>> {
    const verified = await this.jwtService.verify(token, {
      algorithms: ['HS256'],
      secret: 'secret-token',
    });

    if (!verified) {
      throw ServiceException.unauthorized('INVALID_TOKEN');
    }
    return verified;
  }

  decode(token: string): Record<string, unknown> {
    return this.jwtService.decode(token);
  }
}
