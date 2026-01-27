import { ICreateOrganizationDto } from '@application/dtos/organization/organization-create.dto';
import { IUpdateOrganizationDto } from '@application/dtos/organization/organization-update.dto';
import { CreateOrganizationUseCase } from '@application/use-cases/organization/create/create.usecase';
import { GetOneOrganizationUseCase } from '@application/use-cases/organization/get-one/get-one.usecase';
import { GetOrganizationsUseCase } from '@application/use-cases/organization/get/get.usecase';
import { UpdateOrganizationUseCase } from '@application/use-cases/organization/update/update.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { GetUserFromSession } from '@infrastructure/decorators/get-user-from-session';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { IDecodedToken } from '@infrastructure/services/auth/rsa-token.service';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';
import { IOrganizationDto } from '@tourgis/contracts/dist/organization/v1';

@Controller({ path: 'organization', version: '1' })
export class OrganizationController {
  constructor(
    private readonly getOrganizationsUsecase: GetOrganizationsUseCase,
    private readonly getOneOrganizationUsecase: GetOneOrganizationUseCase,
    private readonly updateOrganizationUsecase: UpdateOrganizationUseCase,
    private readonly createOrganizationUsecase: CreateOrganizationUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @GetUserFromSession() user: IDecodedToken,
    @Query() query: { select?: string; filter?: string; limit?: number; offset?: number },
  ): Promise<IOrganizationsDataResponse> {
    const formatQuery = {
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
    };
    return this.getOrganizationsUsecase.execute(
      { commonUserId, systemRole: user.systemRole as string },
      formatQuery,
    );
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetCommonUserId() commonUserId: string,
    @GetUserFromSession() user: IDecodedToken,
    @Param('id') organizationId: string,
    @Query() query: { select?: string; include?: string },
  ): Promise<IOrganizationDto> {
    const formatQuery = {
      organizationId,
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.include ? { include: query.include.split('_') } : {}),
    };
    return this.getOneOrganizationUsecase.execute(
      { commonUserId, systemRole: user.systemRole as string },
      formatQuery,
    );
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetCommonUserId() commonUserId: string,
    @GetUserFromSession() user: IDecodedToken,
    @Param('id') organizationId: string,
    @Body() data: IUpdateOrganizationDto,
  ): Promise<{ success: boolean }> {
    await this.updateOrganizationUsecase.execute(
      { commonUserId, systemRole: user.systemRole as string },
      { organizationId, ...data },
    );

    return { success: true };
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetCommonUserId() commonUserId: string,
    @Body() data: ICreateOrganizationDto,
  ): Promise<boolean> {
    return this.createOrganizationUsecase.execute(commonUserId, data);
  }
}
