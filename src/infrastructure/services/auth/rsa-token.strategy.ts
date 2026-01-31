import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ServiceException } from '@shared/exceptions/service.exception';
import { Strategy } from 'passport-http-bearer';
import { IDecodedToken, RsaTokenService } from './rsa-token.service';

@Injectable()
export class RsaTokenStrategy extends PassportStrategy(Strategy, 'rsa-bearer') {
  private readonly logger = new Logger(RsaTokenStrategy.name);

  constructor(private readonly rsaTokenService: RsaTokenService) {
    super();
  }

  /**
   * Passport стратегия для валидации RSA токена
   * Переопределяем метод validate для проверки токена
   */
  async validate(token: string): Promise<IDecodedToken> {
    if (!token) ServiceException.forbidden('ACCESS_TOKEN_IS_REQUIRED');
    try {
      const decodedToken = await this.rsaTokenService.validateToken(token);

      if (!decodedToken.sub) ServiceException.forbidden('INVALID_TOKEN');

      this.logger.debug(`✓ Token validated for user: ${decodedToken.sub as string}`);
      return await Promise.resolve(decodedToken);
    } catch (error) {
      this.logger.warn(
        `Token validation failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
