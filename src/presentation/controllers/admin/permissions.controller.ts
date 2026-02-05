import { GetAdminPermissionsUseCase } from '@application/use-cases/admin/permissions/get-permissions.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';

@Controller({ path: 'admin/permissions', version: '1' })
@UseGuards(RsaAuthGuard)
export class AdminPermissionsController {
  constructor(private readonly getAdminPermissionsUseCase: GetAdminPermissionsUseCase) {}

  @Get()
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query() query: { preset?: string; limit?: number; offset?: number },
  ): Promise<unknown> {
    return this.getAdminPermissionsUseCase.execute(
      { commonUserId, isStaffUser },
      {
        preset: query.preset,
        limit: query.limit,
        offset: query.offset,
      },
    );
  }
}
