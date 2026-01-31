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
import { IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';
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
    @Query() query: { select?: string; filter?: string; limit?: number; offset?: number },
  ): Promise<unknown> {
    const formatQuery = {
      organizationId,
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
    };

    const members = (await this.getMembersUseCase.execute(
      { commonUserId },
      formatQuery,
    )) as (Organization.v1.IOrganizationMemberDto &
      Organization.v1.IOrganizationMemberRelationsMap)[];

    const users: IQueryAuthUsersDataResponse['data'] = (
      await this.getUsersUseCase.execute(commonUserId, {
        // @ts-expect-error: any
        filter: JSON.stringify({ id: { in: members.data.map((member) => member.user.commonId) } }),
      })
    ).data;

    // @ts-expect-error: any
    const resMapperObject = members.data?.map((member) => ({
      ...member,
      user: {
        ...member.user,
        ...users.find((user) => user.auth.id === member.user.commonId),
      },
    }));

    return resMapperObject;
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
