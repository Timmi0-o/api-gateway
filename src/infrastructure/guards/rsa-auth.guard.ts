import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  handleRequest<TUser>(err: unknown, user: TUser): TUser {
    if (err || !user) {
      throw err instanceof Error ? err : new Error('Unauthorized');
    }

    return user;
  }
}
