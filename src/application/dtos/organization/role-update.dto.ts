export interface IUpdateRoleDto {
  roleId: string;
  organizationId: string;
  name: string;
  description?: string | null;
}
