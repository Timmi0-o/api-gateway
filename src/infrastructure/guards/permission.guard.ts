import { PERMISSION_KEY } from '@infrastructure/decorators/permission.decorator';
import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { UserCacheDataService } from '@infrastructure/services/user-cache-data/user-cache-data.service';
import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EAuthUserRole } from '@tourgis/contracts/dist/auth/v1';

@Injectable()
export class PermissionGuard implements CanActivate {
  private readonly logger = new Logger(PermissionGuard.name);

  constructor(
    private readonly userCacheDataService: UserCacheDataService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: IDecodedToken = request.user;

    if (user.systemRole === EAuthUserRole.ADMIN || user.systemRole === EAuthUserRole.SUPER_ADMIN) {
      return true;
    }

    const permissions = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());

    if (!permissions?.length) {
      return true;
    }

    for (const permission of permissions) {
      const hasPermission = await this.userCacheDataService.hasUserPermission(
        user.sub as string,
        user.orgId as string,
        permission,
      );

      if (!hasPermission) {
        this.logger.error(
          `Permission denied: missing "${permission}" (userId=${user.sub}, orgId=${user.orgId})`,
        );
        return false;
      }
    }

    return true;
  }
}
