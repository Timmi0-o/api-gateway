import { ICreateDistrictRegionDto } from '@application/dtos/geo/district-region/create-district-region.dto';
import { IUpdateDistrictRegionDto } from '@application/dtos/geo/district-region/update-district-region.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { IDistrictRegionResponse } from '@application/dtos/geo/response/district-region.response';
import { CreateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/create/create.usecase';
import { DeleteDistrictRegionUseCase } from '@application/use-cases/geo/district-region/delete/delete.usecase';
import { GetDistrictRegionsUseCase } from '@application/use-cases/geo/district-region/get-many/get-many.usecase';
import { GetDistrictRegionUseCase } from '@application/use-cases/geo/district-region/get-one/get-one.usecase';
import { UpdateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/update/update.usecase';
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

@Controller({ path: 'geo/district-regions', version: '1' })
export class DistrictRegionController {
  constructor(
    private readonly getDistrictRegionUseCase: GetDistrictRegionUseCase,
    private readonly getDistrictRegionsUseCase: GetDistrictRegionsUseCase,
    private readonly createDistrictRegionUseCase: CreateDistrictRegionUseCase,
    private readonly updateDistrictRegionUseCase: UpdateDistrictRegionUseCase,
    private readonly deleteDistrictRegionUseCase: DeleteDistrictRegionUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<IDistrictRegionResponse[]> {
    return this.getDistrictRegionsUseCase.execute({ data: query, metadata });
  }

  @Get(':id')
  @PublicEndpoint()
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: IBaseQuery,
  ): Promise<IDistrictRegionResponse> {
    return this.getDistrictRegionUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateDistrictRegionDto,
  ): Promise<IDistrictRegionResponse> {
    return this.createDistrictRegionUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateDistrictRegionDto, 'slugOrId'>,
  ): Promise<IDistrictRegionResponse> {
    return this.updateDistrictRegionUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IDistrictRegionResponse> {
    return this.deleteDistrictRegionUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
