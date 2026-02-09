import { GetOrganizationFilesUseCase } from '@application/use-cases/organization-files/get-organization-files/get-organization-files.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { GetUserFromSession } from '@infrastructure/decorators/get-user-from-session';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Permissions } from '@tourgis/common';
import { IGetOrganizationFilesResponse } from '@tourgis/contracts/dist/files/v1';

@Controller({ path: 'organization/:organizationId/files', version: '1' })
export class OrganizationFilesController {
  constructor(private readonly getOrganizationFilesUseCase: GetOrganizationFilesUseCase) {}

  @Get()
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.file.read)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @GetUserFromSession() user: IDecodedToken,
    @IsStaffUser() isStaffUser: boolean,
    @Param('organizationId') organizationId: string,
    @Query() query: { path?: string; requiredIds?: string; preset?: string },
  ): Promise<IGetOrganizationFilesResponse> {
    const requiredIds = query.requiredIds ? (JSON.parse(query.requiredIds) as string[]) : [];
    return this.getOrganizationFilesUseCase.execute(
      {
        commonUserId,
        isStaffUser,
        systemRole: user.systemRole as string,
      },
      {
        path: query.path,
        requiredIds,
        preset: query.preset ?? 'MINIMAL',
        organizationId,
      },
    );
  }
}
