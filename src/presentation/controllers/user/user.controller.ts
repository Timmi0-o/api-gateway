import { IRegisterDto } from '@application/dtos/user/register.dto';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import { Body, Controller, Post } from '@nestjs/common';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly registerUsecase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() data: IRegisterDto): Promise<IRegisterResponse> {
    return this.registerUsecase.execute(data);
  }
}
