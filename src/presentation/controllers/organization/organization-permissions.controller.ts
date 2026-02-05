import { GetOrganizationPermissionsUseCase } from '@application/use-cases/organization-permissions/get/get-permissions.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'organization/:organizationId/permissions', version: '1' })
export class OrganizationPermissionsController {
  constructor(
    private readonly getOrganizationPermissionsUseCase: GetOrganizationPermissionsUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query() query: { preset?: string; limit?: number; offset?: number },
  ): Promise<unknown> {
    return this.getOrganizationPermissionsUseCase.execute(
      { commonUserId, isStaffUser },
      {
        organizationId,
        preset: query.preset,
        limit: query.limit,
        offset: query.offset,
      },
    );
  }
}
