export interface ICreateRolePermissionsDto {
  roleId: string;
  organizationId: string;
  permissionIds: string[];
}
