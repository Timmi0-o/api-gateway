import { ICreateLocalityDistrictDto } from '@application/dtos/geo/locality-district/create-locality-district.dto';
import { IUpdateLocalityDistrictDto } from '@application/dtos/geo/locality-district/update-locality-district.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { ILocalityDistrictResponse } from '@application/dtos/geo/response/locality-district.response';
import { CreateLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/create/create.usecase';
import { DeleteLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/delete/delete.usecase';
import { GetLocalityDistrictsUseCase } from '@application/use-cases/geo/locality-district/get-many/get-many.usecase';
import { GetLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/get-one/get-one.usecase';
import { UpdateLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/update/update.usecase';
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

@Controller({ path: 'geo/locality-districts', version: '1' })
export class LocalityDistrictController {
  constructor(
    private readonly getLocalityDistrictUseCase: GetLocalityDistrictUseCase,
    private readonly getLocalityDistrictsUseCase: GetLocalityDistrictsUseCase,
    private readonly createLocalityDistrictUseCase: CreateLocalityDistrictUseCase,
    private readonly updateLocalityDistrictUseCase: UpdateLocalityDistrictUseCase,
    private readonly deleteLocalityDistrictUseCase: DeleteLocalityDistrictUseCase,
  ) {}

  @Get()
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<ILocalityDistrictResponse[]> {
    return this.getLocalityDistrictsUseCase.execute({
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
  ): Promise<ILocalityDistrictResponse> {
    return this.getLocalityDistrictUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateLocalityDistrictDto,
  ): Promise<ILocalityDistrictResponse> {
    return this.createLocalityDistrictUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateLocalityDistrictDto, 'slugOrId'>,
  ): Promise<ILocalityDistrictResponse> {
    return this.updateLocalityDistrictUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<ILocalityDistrictResponse> {
    return this.deleteLocalityDistrictUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
