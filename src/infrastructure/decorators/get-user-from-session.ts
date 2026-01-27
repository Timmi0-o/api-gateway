import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserFromSession = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IDecodedToken => {
    const request = ctx.switchToHttp().getRequest<Request & { user: IDecodedToken }>();

    const user = request.user;

    return {
      id: user.sub as string,
      systemRole: user.systemRole as string,
      roleId: user.roleId as string,
      status: user.status as string,
    } as IDecodedToken;
  },
);
