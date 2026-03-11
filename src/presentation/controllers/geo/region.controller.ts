import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ICreateRegionDto } from '@application/dtos/geo/region/create-region.dto';
import { IUpdateRegionDto } from '@application/dtos/geo/region/update-region.dto';
import { IRegionResponse } from '@application/dtos/geo/response/region.response';
import { CreateRegionUseCase } from '@application/use-cases/geo/region/create/create.usecase';
import { DeleteRegionUseCase } from '@application/use-cases/geo/region/delete/delete.usecase';
import { GetRegionsUseCase } from '@application/use-cases/geo/region/get-many/get-many.usecase';
import { GetRegionUseCase } from '@application/use-cases/geo/region/get-one/get-one.usecase';
import { UpdateRegionUseCase } from '@application/use-cases/geo/region/update/update.usecase';
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

@Controller({ path: 'geo/regions', version: '1' })
export class RegionController {
  constructor(
    private readonly getRegionUseCase: GetRegionUseCase,
    private readonly getRegionsUseCase: GetRegionsUseCase,
    private readonly createRegionUseCase: CreateRegionUseCase,
    private readonly updateRegionUseCase: UpdateRegionUseCase,
    private readonly deleteRegionUseCase: DeleteRegionUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<IRegionResponse[]> {
    return this.getRegionsUseCase.execute({ data: query, metadata });
  }

  @Get(':id')
  @PublicEndpoint()
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: IBaseQuery,
  ): Promise<IRegionResponse> {
    return this.getRegionUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateRegionDto,
  ): Promise<IRegionResponse> {
    return this.createRegionUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateRegionDto, 'slugOrId'>,
  ): Promise<IRegionResponse> {
    return this.updateRegionUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IRegionResponse> {
    return this.deleteRegionUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
