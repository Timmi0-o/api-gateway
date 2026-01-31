import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IUpdateUserDto } from '@application/dtos/user/update.dto';
import { GetOneUserUseCase } from '@application/use-cases/user/get-one/get-one.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update/update.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { IMergedUserData, IQueryAuthUsersDataResponse } from '@tourgis/contracts/dist/auth/v1';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly registerUsecase: RegisterUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
    private readonly getOneUserUsecase: GetOneUserUseCase,
    private readonly updateUserUsecase: UpdateUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() data: IRegisterDto): Promise<IRegisterResponse> {
    return this.registerUsecase.execute(data);
  }

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Query()
    query: { select?: string; filter?: string; limit?: number; offset?: number; include?: string },
  ): Promise<IQueryAuthUsersDataResponse> {
    const formatQuery = {
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
      ...(query.include ? { include: query.include } : {}),
    };
    return this.getUsersUsecase.execute(commonUserId, formatQuery);
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetCommonUserId() commonUserId: string,
    @Param('id') userId: string,
    @Query() query: { select?: string; include?: string },
  ): Promise<{ result: IMergedUserData }> {
    const formatQuery = {
      userId,
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.include ? { include: query.include } : {}),
    };
    return this.getOneUserUsecase.execute(commonUserId, formatQuery);
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetCommonUserId() commonUserId: string,
    @Param('id') userId: string,
    @Body() data: IUpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.updateUserUsecase.execute(commonUserId, { userId, ...data });

    return { success: true };
  }
}
