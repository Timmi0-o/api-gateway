import { EUserSource } from '@application/dtos/auth/login.dto';
import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getUserIdentityKeyFromRequest } from '@shared/utils/get-user-identity-key-from-request';
import { getUserSourceFromRequest } from '@shared/utils/get-user-source-from-request';
import { EAuthUserRole } from '@tourgis/contracts/dist/auth/v1';
import { Request } from 'express';

export interface IMetadataObjectForGrpcRequest extends Record<string, unknown> {
  commonUserId: string;
  isStaffUser?: boolean;
  systemRole?: string;
  source?: EUserSource;
  orgId?: string;
  identityScopeKey?: string;
}

/**
 * Декоратор для получения metadata объекта для gRPC запроса
 */
export const GetMetadataObjectForGrpcRequest = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): IMetadataObjectForGrpcRequest => {
    const request = ctx.switchToHttp().getRequest<Request & { user: IDecodedToken }>();

    const user = request.user;

    const metadata: IMetadataObjectForGrpcRequest = {
      commonUserId: user?.sub as string,
      isStaffUser:
        user?.systemRole === EAuthUserRole.ADMIN || user?.systemRole === EAuthUserRole.SUPER_ADMIN,
      systemRole: user?.systemRole as string,
      source: getUserSourceFromRequest(request) as EUserSource,
      orgId: user?.orgId as string,
      identityScopeKey: getUserIdentityKeyFromRequest(request),
    };

    return metadata;
  },
);
