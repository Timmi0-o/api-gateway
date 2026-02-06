export interface IUserPermissionsCacheItem {
  roleId: string;
  permissions: string[];
}

export interface IUserCacheDataService {
  fillUserPermissionsForAllOrganizations(commonUserId: string): Promise<void>;
  getUserPermissions(
    commonUserId: string,
    organizationId: string,
  ): Promise<IUserPermissionsCacheItem | null>;
  hasUserPermission(
    commonUserId: string,
    organizationId: string,
    permissionName: string,
  ): Promise<boolean>;
  clearUserPermissionsCache(commonUserId: string, organizationId?: string): Promise<void>;
}
