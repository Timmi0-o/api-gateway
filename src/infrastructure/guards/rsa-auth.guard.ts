import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServiceException } from '@shared/exceptions/service.exception';
import { Observable } from 'rxjs';

/**
 * AuthGuard для проверки RSA токенов
 * Проверяет токен из заголовка Authorization: Bearer <token>
 * и устанавливает req.user.common_user_id на основе данных из токена
 */
@Injectable()
export class RsaAuthGuard extends AuthGuard('rsa-bearer') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser>(err: unknown, user: TUser): TUser | ServiceException {
    if (err || !user) {
      throw ServiceException.unauthorized('EXPIRED_OR_INVALID_ACCESS_TOKEN');
    }

    return user;
  }
}
