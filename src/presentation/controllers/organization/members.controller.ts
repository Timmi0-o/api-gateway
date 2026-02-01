import { EUserSource } from '@application/dtos/auth/login.dto';
import { IAddOrganizationMemberDto } from '@application/dtos/organization/organization-member-add.dto';
import { AddMemberUseCase } from '@application/use-cases/organization-members/add-member/add-member.usecase';
import { GetMembersUseCase } from '@application/use-cases/organization-members/get-members/get-members.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { getUserSourceFromRequest } from '@shared/utils/get-user-source-from-request';
import { Organization } from '@tourgis/contracts';
import { Request } from 'express';

@Controller({ path: 'organization/:organizationId/members', version: '1' })
export class MembersController {
  constructor(
    private readonly getMembersUseCase: GetMembersUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly addMemberUseCase: AddMemberUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
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
      { commonUserId },
      formatQuery,
    )) as (Organization.v1.IOrganizationMemberDto &
      Organization.v1.IOrganizationMemberRelationsMap)[];

    return members;
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async addMember(
    @GetCommonUserId() commonUserId: string,
    @Param('organizationId') organizationId: string,
    @Body() data: IAddOrganizationMemberDto,
    @Req() request: Request,
  ): Promise<{ success: boolean }> {
    const source = getUserSourceFromRequest(request) as EUserSource;
    data.source = source;

    return this.addMemberUseCase.execute(commonUserId, {
      ...data,
      organizationId,
    });
  }
}
