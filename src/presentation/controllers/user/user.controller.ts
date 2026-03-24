import { IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IRegisterDto } from '@application/dtos/user/register.dto';
import { IUpdateUserDto } from '@application/dtos/user/update.dto';
import { GetOneUserUseCase } from '@application/use-cases/user/get-one/get-one.usecase';
import { GetUsersUseCase } from '@application/use-cases/user/get/get.usecase';
import { RegisterUseCase } from '@application/use-cases/user/register.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update/update.usecase';
import { IRegisterResponse } from '@domain/types/user.types';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
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
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query()
    query: IRawArrayQuery,
  ): Promise<IQueryAuthUsersDataResponse> {
    return this.getUsersUsecase.execute({ data: query, metadata });
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') userId: string,
    @Query() query: IRawArrayQuery,
  ): Promise<{ result: IUserWithOrganizationData | null }> {
    return this.getOneUserUsecase.execute({ data: { userId, ...query }, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') userId: string,
    @Body() data: IUpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.updateUserUsecase.execute({ data: { userId, ...data }, metadata });

    return { success: true };
  }
}
