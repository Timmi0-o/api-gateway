import { GetOneUserUseCase } from '@application/use-cases/user/get-one/get-one.usecase';
import { RedisService } from '@infrastructure/services/redis/redis.service';
import { Injectable } from '@nestjs/common';

const CACHE_KEY_PREFIX = 'user-permissions:';

export interface IUserPermissionsCacheItem {
  roleId: string;
  permissions: string[];
}

type MemberWithRolePermissions = {
  isActive: boolean;
  organization: { id: string };
  role: { id: string; rolePermissions: Array<{ permissions: Array<{ name: string }> }> };
};

@Injectable()
export class UserCacheDataService {
  constructor(
    private readonly redis: RedisService,
    private readonly getOneUserUseCase: GetOneUserUseCase,
  ) {}

  private cacheKey(commonUserId: string, organizationId: string): string {
    return `${CACHE_KEY_PREFIX}${commonUserId}:${organizationId}`;
  }

  private buildPermissionsFromMember(member: MemberWithRolePermissions): string[] {
    return member.role.rolePermissions.flatMap((rp) => rp.permissions.map((p) => p.name));
  }

  private async fetchAndFillCache(
    commonUserId: string,
  ): Promise<Map<string, IUserPermissionsCacheItem>> {
    const { result: user } = await this.getOneUserUseCase.execute(
      { commonUserId, isStaffUser: false },
      { userId: commonUserId, preset: 'BASE' },
    );

    const map = new Map<string, IUserPermissionsCacheItem>();

    if (!user?.organizationUser?.organizationMembers?.length) {
      return map;
    }

    for (const member of user.organizationUser
      .organizationMembers as unknown as MemberWithRolePermissions[]) {
      if (!member.isActive) continue;
      const orgId = member.organization.id;
      const item: IUserPermissionsCacheItem = {
        roleId: member.role.id,
        permissions: this.buildPermissionsFromMember(member),
      };
      map.set(orgId, item);
      await this.redis.set(
        this.cacheKey(commonUserId, orgId),
        item as unknown as Record<string, unknown>,
      );
    }

    return map;
  }

  async fillUserPermissionsForAllOrganizations(commonUserId: string): Promise<void> {
    await this.fetchAndFillCache(commonUserId);
  }

  async getUserPermissions(
    commonUserId: string,
    organizationId: string,
  ): Promise<IUserPermissionsCacheItem | null> {
    const key = this.cacheKey(commonUserId, organizationId);
    const cached = await this.redis.get(key);
    if (cached) {
      try {
        return JSON.parse(cached) as IUserPermissionsCacheItem;
      } catch {
        // invalid json, fall through to fetch
      }
    }

    const map = await this.fetchAndFillCache(commonUserId);
    return map.get(organizationId) ?? null;
  }

  async hasUserPermission(
    commonUserId: string,
    organizationId: string,
    permissionName: string,
  ): Promise<boolean> {
    const data = await this.getUserPermissions(commonUserId, organizationId);
    return data?.permissions?.includes(permissionName) ?? false;
  }

  async clearUserPermissionsCache(commonUserId: string, organizationId?: string): Promise<void> {
    if (organizationId) {
      await this.redis.del(this.cacheKey(commonUserId, organizationId));
      return;
    }
    const keys = await this.redis.keys(`${CACHE_KEY_PREFIX}${commonUserId}:*`);
    if (keys.length > 0) {
      await this.redis.delMany(keys);
    }
  }
}
