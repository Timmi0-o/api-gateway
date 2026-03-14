export interface ICreatePropertyAccessPermissionsDto {
  propertyId: string;
  permissions: string[];
  userIds?: string[];
  roleIds?: string[];
}

export interface IUpdatePropertyAccessPermissionDto {
  propertyId?: string;
  permissions?: string[];
  userIds?: string[];
  roleIds?: string[];
}

export interface ISoftDeletePropertyAccessPermissionsDto {
  propertyAccessPermissionIds: string[];
}
