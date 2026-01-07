import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IUserDto } from '@application/dtos/user/user.dto';
import { GetManyUseCase } from '@application/use-cases/user/get-many.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(
    private readonly registerUsecase: RegisterUseCase,
    private readonly getManyUsecase: GetManyUseCase,
  ) {}

  @Post('register')
  async register(@Body() data: IRegisterDto): Promise<IRegisterResponse> {
    return this.registerUsecase.execute(data);
  }

  @Get('get-many')
  async getMany(): Promise<{
    meta: { total: number; limit: number; count: number };
    items: IUserDto[];
  }> {
    return this.getManyUsecase.execute();
  }
}
