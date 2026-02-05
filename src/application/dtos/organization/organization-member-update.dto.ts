export interface IUpdateOrganizationMemberDto {
  commonUserId: string;
  organizationId: string;
  userId: string;
  roleId: string;
  isActive?: boolean;
}
