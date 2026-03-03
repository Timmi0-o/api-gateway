import { ICreateLocalityDto } from '@application/dtos/geo/locality/create-locality.dto';
import { IUpdateLocalityDto } from '@application/dtos/geo/locality/update-locality.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { ILocalityResponse } from '@application/dtos/geo/response/locality.response';
import { CreateLocalityUseCase } from '@application/use-cases/geo/locality/create/create.usecase';
import { DeleteLocalityUseCase } from '@application/use-cases/geo/locality/delete/delete.usecase';
import { GetLocalitiesUseCase } from '@application/use-cases/geo/locality/get-many/get-many.usecase';
import { GetLocalityUseCase } from '@application/use-cases/geo/locality/get-one/get-one.usecase';
import { UpdateLocalityUseCase } from '@application/use-cases/geo/locality/update/update.usecase';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
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

@Controller({ path: 'geo/localities', version: '1' })
export class LocalityController {
  constructor(
    private readonly getLocalityUseCase: GetLocalityUseCase,
    private readonly getLocalitiesUseCase: GetLocalitiesUseCase,
    private readonly createLocalityUseCase: CreateLocalityUseCase,
    private readonly updateLocalityUseCase: UpdateLocalityUseCase,
    private readonly deleteLocalityUseCase: DeleteLocalityUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<ILocalityResponse[]> {
    return this.getLocalitiesUseCase.execute({
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
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: IBaseQuery,
  ): Promise<ILocalityResponse> {
    return this.getLocalityUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateLocalityDto,
  ): Promise<ILocalityResponse> {
    return this.createLocalityUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateLocalityDto, 'slugOrId'>,
  ): Promise<ILocalityResponse> {
    return this.updateLocalityUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<ILocalityResponse> {
    return this.deleteLocalityUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
