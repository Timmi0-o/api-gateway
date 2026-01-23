import { IRegisterDto } from '@application/dtos/user/register.dto';
import { GetUsersUseCase } from '@application/use-cases/user/get-usecase/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import { GetCommonUserId } from '@infrastructure/decorators/get-common-user-id.decorator';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { IUsersDataResponse } from '@tourgis/contracts/dist/api-gateway/auth/v1/contracts/user/users-data.contract';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly registerUsecase: RegisterUseCase,
    private readonly getUsersUsecase: GetUsersUseCase,
  ) {}

  @Post('register')
  async register(@Body() data: IRegisterDto): Promise<IRegisterResponse> {
    return this.registerUsecase.execute(data);
  }

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetCommonUserId() commonUserId: string,
    @Query() query: any,
  ): Promise<IUsersDataResponse> {
    console.log('query', query);

    const formatQuery = {
      ...(query.select ? { select: query.select.split('_') } : {}),
      ...(query.filter ? { filter: query.filter } : {}),
      ...(query.limit ? { limit: query.limit } : {}),
      ...(query.offset ? { offset: query.offset } : {}),
      ...(query.include ? { include: query.include } : {}),
    };
    return this.getUsersUsecase.execute(commonUserId, formatQuery);
  }
}
