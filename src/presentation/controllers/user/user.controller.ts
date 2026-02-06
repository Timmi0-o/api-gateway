import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IUpdateUserDto } from '@application/dtos/user/update.dto';
import { GetOneUserUseCase } from '@application/use-cases/user/get-one/get-one.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update/update.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { IsStaffUser } from '@infrastructure/decorators/is-staff-user';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { getUserIdentityKeyFromRequest } from '@shared/utils/get-user-identity-key-from-request';
import {
  IQueryAuthUsersDataResponse,
  IUserWithOrganizationData,
} from '@tourgis/contracts/dist/auth/v1';
import { Request } from 'express';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly registerUsecase: RegisterUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
    private readonly getOneUserUsecase: GetOneUserUseCase,
    private readonly updateUserUsecase: UpdateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() data: IRegisterDto, @Req() request: Request): Promise<IRegisterResponse> {
    const identityScopeKey = getUserIdentityKeyFromRequest(request);
    data.identityScopeKey = identityScopeKey as string;

    return this.registerUsecase.execute(data);
  }

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Query()
    query: { filter?: string; limit?: number; page?: number; preset: string },
  ): Promise<IQueryAuthUsersDataResponse> {
    const formatQuery = {
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.page ? { page: query.page } : {}),
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
    };
    return this.getUsersUsecase.execute({ commonUserId, isStaffUser }, formatQuery);
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Param('id') userId: string,
    @Query() query: { preset: string },
  ): Promise<{ result: IUserWithOrganizationData | null }> {
    const formatQuery = {
      userId,
      ...(query.preset ? { preset: query.preset } : { preset: 'MINIMAL' }),
    };
    return this.getOneUserUsecase.execute({ commonUserId, isStaffUser }, formatQuery);
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetCommonUserId() commonUserId: string,
    @IsStaffUser() isStaffUser: boolean,
    @Param('id') userId: string,
    @Body() data: IUpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.updateUserUsecase.execute({ commonUserId, isStaffUser }, { userId, ...data });

    return { success: true };
  }
}
