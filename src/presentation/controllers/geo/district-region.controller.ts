import { ICreateDistrictRegionDto } from '@application/dtos/geo/district-region/create-district-region.dto';
import { IUpdateDistrictRegionDto } from '@application/dtos/geo/district-region/update-district-region.dto';
import { CreateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/create/create.usecase';
import { DeleteDistrictRegionUseCase } from '@application/use-cases/geo/district-region/delete/delete.usecase';
import { GetDistrictRegionsUseCase } from '@application/use-cases/geo/district-region/get-many/get-many.usecase';
import { GetDistrictRegionUseCase } from '@application/use-cases/geo/district-region/get-one/get-one.usecase';
import { UpdateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/update/update.usecase';
import { IDistrictRegionResponse } from '@application/dtos/geo/response/district-region.response';
import {
  GetMetadataObjectForGrpcRequest,
  IMetadataObjectForGrpcRequest,
} from '@infrastructure/decorators/get-metadata-object-for-grpc-request';
import { RsaAuthGuard } from '@infrastructure/guards/rsa-auth.guard';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';

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
  @UseGuards(RsaAuthGuard)
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: { preset?: string; filter?: string; limit?: number; offset?: number },
  ): Promise<IDistrictRegionResponse[]> {
    return this.getDistrictRegionsUseCase.execute({
      data: {
        preset: query.preset ?? 'BASE',
        limit: query.limit ?? 25,
        offset: query.offset ?? 0,
        filter: query.filter ? (JSON.parse(query.filter) as Record<string, unknown>) : undefined,
      },
      metadata,
    });
  }

  @Get(':id')
  @UseGuards(RsaAuthGuard)
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: { preset?: string },
  ): Promise<IDistrictRegionResponse> {
    return this.getDistrictRegionUseCase.execute({
      data: { slug: id, preset: query.preset ?? 'BASE' },
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
    @Body() body: Omit<IUpdateDistrictRegionDto, 'slug'>,
  ): Promise<IDistrictRegionResponse> {
    return this.updateDistrictRegionUseCase.execute({
      data: { slug: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IDistrictRegionResponse> {
    return this.deleteDistrictRegionUseCase.execute({ data: { slug: id }, metadata });
  }
}
