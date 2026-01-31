import { IRegisterDto } from '@application/dtos/user/register.dto';

export interface IAddOrganizationMemberDto extends IRegisterDto {
  organizationId: string;
  userId?: string;
  roleId: string;
}
