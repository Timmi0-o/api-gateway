import { EditOrganizationModulesUseCase } from '@application/use-cases/organization-modules/edit/edit.usecase';
import { GetOrganizationModulesUseCase } from '@application/use-cases/organization-modules/get-modules/get-modules.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { GetUserFromSession } from '@infrastructure/decorators/get-user-from-session';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/modules', version: '1' })
@UseGuards(RsaAuthGuard)
export class OrganizationModulesController {
  constructor(
    private readonly getOrganizationModulesUseCase: GetOrganizationModulesUseCase,
    private readonly editOrganizationModulesUseCase: EditOrganizationModulesUseCase,
  ) {}

  @Get()
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @GetUserFromSession() user: IDecodedToken,
    @IsStaffUser() isStaffUser: boolean,
    @Param('organizationId') organizationId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOrganizationModulesUseCase.execute(
      {
        commonUserId,
        systemRole: user.systemRole as string,
        isStaffUser,
      },
      { organizationId, preset: preset ?? 'MINIMAL' },
    );
  }

  @Patch()
  async edit(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Param('organizationId') organizationId: string,
    @Body() data: { added: string[]; deleted: string[] },
  ): Promise<{ success: boolean }> {
    return this.editOrganizationModulesUseCase.execute(
      { commonUserId, isStaffUser },
      { organizationId, added: data.added ?? [], deleted: data.deleted ?? [] },
    );
  }
}
