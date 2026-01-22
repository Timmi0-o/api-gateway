import { ICreateOrganizationDto } from '@application/dtos/organization/organization-create.dto';
import { CreateOrganizationUseCase } from '@application/use-cases/organization/create/create.usecase';
import { GetOrganizationsUseCase } from '@application/use-cases/organization/get/get.usecase';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IOrganizationsDataResponse } from '@tourgis/contracts/dist/api-gateway/organization/v1/contracts/organization/organizations-data.contract';

@Controller({ path: 'organization', version: '1' })
export class OrganizationController {
  constructor(
    private readonly getOrganizationsUsecase: GetOrganizationsUseCase,
    private readonly createOrganizationUsecase: CreateOrganizationUseCase,
  ) { }

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Query() query: { select?: string; filter?: string; limit?: number; offset?: number },
  ): Promise<IOrganizationsDataResponse> {
    const formatQuery = {
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
    };
    return this.getOrganizationsUsecase.execute(commonUserId, formatQuery);
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
