export interface ICreateRoleDto {
  organizationId: string;
  name: string;
  description?: string | null;
}
