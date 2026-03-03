import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { ServiceException } from '@shared/exceptions/service.exception';
import { EAuthUserRole } from '@tourgis/contracts/dist/auth/v1';

interface IRequestWithUser extends Request {
  user?: { sub?: string; systemRole?: string };
}

@Injectable()
export class StaffOnlyGuard {
  private readonly logger = new Logger(StaffOnlyGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<IRequestWithUser>();
    const user = request.user;

    if (!user) {
      throw ServiceException.unauthorized('EXPIRED_OR_INVALID_ACCESS_TOKEN');
    }

    const isStaff =
      user.systemRole === EAuthUserRole.ADMIN || user.systemRole === EAuthUserRole.SUPER_ADMIN;

    if (!isStaff) {
      this.logger.warn('User is not staff');
      throw ServiceException.forbidden('У вас нет доступа к этому ресурсу');
    }

    return true;
  }
}
