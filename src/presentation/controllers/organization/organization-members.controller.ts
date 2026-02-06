import { EUserSource } from '@application/dtos/auth/login.dto';
import { IAddOrganizationMemberDto } from '@application/dtos/organization/organization-member-add.dto';
import { IUpdateOrganizationMemberDto } from '@application/dtos/organization/organization-member-update.dto';
import { AddMemberUseCase } from '@application/use-cases/organization-members/add-member/add-member.usecase';
import { DeleteOrganizationMemberUseCase } from '@application/use-cases/organization-members/delete/delete.usecase';
import { GetMembersUseCase } from '@application/use-cases/organization-members/get-members/get-members.usecase';
import { GetOneOrganizationMemberUseCase } from '@application/use-cases/organization-members/get-one/get-one.usecase';
import { UpdateOrganizationMemberUseCase } from '@application/use-cases/organization-members/update/update.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { getUserIdentityKeyFromRequest } from '@shared/utils/get-user-identity-key-from-request';
import { getUserSourceFromRequest } from '@shared/utils/get-user-source-from-request';
import { Organization } from '@tourgis/contracts';
import { Request } from 'express';

@Controller({ path: 'organization/:organizationId/members', version: '1' })
export class MembersController {
  constructor(
    private readonly getMembersUseCase: GetMembersUseCase,
    private readonly getOneOrganizationMemberUseCase: GetOneOrganizationMemberUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly addMemberUseCase: AddMemberUseCase,
    private readonly updateOrganizationMemberUseCase: UpdateOrganizationMemberUseCase,
    private readonly deleteOrganizationMemberUseCase: DeleteOrganizationMemberUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query() query: { filter?: string; limit?: number; offset?: number; preset: string },
  ): Promise<unknown> {
    const formatQuery = {
      organizationId,
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
    };

    const members = (await this.getMembersUseCase.execute(
      { commonUserId, isStaffUser },
      formatQuery,
    )) as (Organization.v1.IOrganizationMemberDto &
      Organization.v1.IOrganizationMemberRelationsMap)[];

    return members;
  }

  @Get(':userId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOneOrganizationMemberUseCase.execute(
      { commonUserId, isStaffUser },
      { organizationId, userId, preset },
    );
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async addMember(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Param('organizationId') organizationId: string,
    @Body() data: IAddOrganizationMemberDto,
    @Req() request: Request,
  ): Promise<{ success: boolean }> {
    const source = getUserSourceFromRequest(request) as EUserSource;
    data.source = source;

    const identityScopeKey = getUserIdentityKeyFromRequest(request);
    data.identityScopeKey = identityScopeKey as string;

    return this.addMemberUseCase.execute(
      { commonUserId, isStaffUser },
      {
        ...data,
        organizationId,
      },
    );
  }

  @Patch(':userId')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Body() data: Pick<IUpdateOrganizationMemberDto, 'roleId' | 'isActive'>,
  ): Promise<unknown> {
    return this.updateOrganizationMemberUseCase.execute(
      { commonUserId, isStaffUser },
      {
        organizationId,
        userId,
        roleId: data.roleId,
        ...(data.isActive !== undefined ? { isActive: data.isActive } : {}),
      },
    );
  }

  @Delete(':userId')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ): Promise<unknown> {
    return this.deleteOrganizationMemberUseCase.execute(commonUserId, {
      organizationId,
      userId,
    });
  }
}
