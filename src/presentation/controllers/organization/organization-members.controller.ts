import { EUserSource } from '@application/dtos/auth/login.dto';
import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IAddOrganizationMemberDto } from '@application/dtos/organization/organization-member-add.dto';
import { IUpdateOrganizationMemberDto } from '@application/dtos/organization/organization-member-update.dto';
import { AddMemberUseCase } from '@application/use-cases/organization-members/add-member/add-member.usecase';
import { DeleteOrganizationMemberUseCase } from '@application/use-cases/organization-members/delete/delete.usecase';
import { GetMembersUseCase } from '@application/use-cases/organization-members/get-members/get-members.usecase';
import { GetOneOrganizationMemberUseCase } from '@application/use-cases/organization-members/get-one/get-one.usecase';
import { UpdateOrganizationMemberUseCase } from '@application/use-cases/organization-members/update/update.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { Permission } from '@infrastructure/decorators/permission.decorator';
import { PermissionGuard } from '@infrastructure/guards/permission.guard';
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
import { Permissions } from '@tourgis/common';
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
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.member.read)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<unknown> {
    return this.getMembersUseCase.execute({
      data: {
        organizationId,
        ...query,
      },
      metadata,
    });
  }

  @Get(':userId')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @Query('preset') preset?: string,
  ): Promise<unknown> {
    return this.getOneOrganizationMemberUseCase.execute({
      data: { organizationId, userId, preset },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async addMember(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Body() data: IAddOrganizationMemberDto,
    @Req() request: Request,
  ): Promise<{ success: boolean }> {
    const source = getUserSourceFromRequest(request) as EUserSource;
    data.source = source;

    const identityScopeKey = getUserIdentityKeyFromRequest(request);
    data.identityScopeKey = identityScopeKey as string;

    return this.addMemberUseCase.execute({
      data: {
        ...data,
        organizationId,
      },
      metadata,
    });
  }

  @Patch(':userId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.member.update)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
    @Body() data: IUpdateOrganizationMemberDto,
  ): Promise<unknown> {
    return this.updateOrganizationMemberUseCase.execute({
      data,
      metadata,
    });
  }

  @Delete(':userId')
  @UseGuards(RsaAuthGuard, PermissionGuard)
  @Permission(Permissions.member.delete)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('organizationId') organizationId: string,
    @Param('userId') userId: string,
  ): Promise<unknown> {
    return this.deleteOrganizationMemberUseCase.execute({
      data: { organizationId, userId },
      metadata,
    });
  }
}
