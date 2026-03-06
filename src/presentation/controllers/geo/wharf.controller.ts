import { ICreateWharfDto } from '@application/dtos/geo/wharf/create-wharf.dto';
import { IUpdateWharfDto } from '@application/dtos/geo/wharf/update-wharf.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { IWharfResponse } from '@application/dtos/geo/response/wharf.response';
import { CreateWharfUseCase } from '@application/use-cases/geo/wharf/create/create.usecase';
import { DeleteWharfUseCase } from '@application/use-cases/geo/wharf/delete/delete.usecase';
import { GetWharvesUseCase } from '@application/use-cases/geo/wharf/get-many/get-many.usecase';
import { GetWharfUseCase } from '@application/use-cases/geo/wharf/get-one/get-one.usecase';
import { UpdateWharfUseCase } from '@application/use-cases/geo/wharf/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { PublicEndpoint } from '@infrastructure/decorators/public-endpoint.decorator';
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
  UseGuards,
} from '@nestjs/common';

@Controller({ path: 'geo/wharves', version: '1' })
export class WharfController {
  constructor(
    private readonly getWharfUseCase: GetWharfUseCase,
    private readonly getWharvesUseCase: GetWharvesUseCase,
    private readonly createWharfUseCase: CreateWharfUseCase,
    private readonly updateWharfUseCase: UpdateWharfUseCase,
    private readonly deleteWharfUseCase: DeleteWharfUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<IWharfResponse[]> {
    return this.getWharvesUseCase.execute({
      data: {
        preset: query.preset ?? 'BASE',
        limit: query.limit ?? 25,
        offset: query.offset ?? 0,
        filter: query.filter,
        orderBy: query.orderBy,
      },
      metadata,
    });
  }

  @Get(':id')
  @PublicEndpoint()
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: IBaseQuery,
  ): Promise<IWharfResponse> {
    return this.getWharfUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateWharfDto,
  ): Promise<IWharfResponse> {
    return this.createWharfUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateWharfDto, 'slugOrId'>,
  ): Promise<IWharfResponse> {
    return this.updateWharfUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IWharfResponse> {
    return this.deleteWharfUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
