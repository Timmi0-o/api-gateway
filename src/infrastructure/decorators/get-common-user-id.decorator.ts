import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Декоратор для получения ID текущего пользователя из req.user.common_user_id
 * Использование только совместно с RsaAuthGuard
 *
 * Пример:
 * @Post('action')
 * @UseGuards(RsaAuthGuard)
 * async performAction(@GetCommonUserId() userId: string) {
 *   // userId уже содержит common_user_id
 * }
 */
export const GetCommonUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request & { user: IDecodedToken }>();

    const userId = request.user.userId;

    if (!userId) {
      throw new BadRequestException('Common user ID not found in token');
    }

    return userId;
  },
);
