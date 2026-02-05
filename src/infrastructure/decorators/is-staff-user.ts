import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { EAuthUserRole } from '@tourgis/contracts/dist/auth/v1';

export const IsStaffUser = createParamDecorator((data: unknown, ctx: ExecutionContext): boolean => {
  const request = ctx.switchToHttp().getRequest<Request & { user: IDecodedToken }>();

  const user = request.user;

  return user.systemRole === EAuthUserRole.ADMIN || user.systemRole === EAuthUserRole.SUPER_ADMIN;
});
