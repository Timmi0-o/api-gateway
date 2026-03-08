import { ICreateTrainStationDto } from '@application/dtos/geo/train-station/create-train-station.dto';
import { IUpdateTrainStationDto } from '@application/dtos/geo/train-station/update-train-station.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { ITrainStationResponse } from '@application/dtos/geo/response/train-station.response';
import { CreateTrainStationUseCase } from '@application/use-cases/geo/train-station/create/create.usecase';
import { DeleteTrainStationUseCase } from '@application/use-cases/geo/train-station/delete/delete.usecase';
import { GetTrainStationsUseCase } from '@application/use-cases/geo/train-station/get-many/get-many.usecase';
import { GetTrainStationUseCase } from '@application/use-cases/geo/train-station/get-one/get-one.usecase';
import { UpdateTrainStationUseCase } from '@application/use-cases/geo/train-station/update/update.usecase';
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

@Controller({ path: 'geo/train-stations', version: '1' })
export class TrainStationController {
  constructor(
    private readonly getTrainStationUseCase: GetTrainStationUseCase,
    private readonly getTrainStationsUseCase: GetTrainStationsUseCase,
    private readonly createTrainStationUseCase: CreateTrainStationUseCase,
    private readonly updateTrainStationUseCase: UpdateTrainStationUseCase,
    private readonly deleteTrainStationUseCase: DeleteTrainStationUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<ITrainStationResponse[]> {
    return this.getTrainStationsUseCase.execute({
      data: {
        preset: query.preset ?? 'BASE',
        limit: query.limit ?? 25,
        page: query.page ?? 1,
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
  ): Promise<ITrainStationResponse> {
    return this.getTrainStationUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateTrainStationDto,
  ): Promise<ITrainStationResponse> {
    return this.createTrainStationUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateTrainStationDto, 'slugOrId'>,
  ): Promise<ITrainStationResponse> {
    return this.updateTrainStationUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<ITrainStationResponse> {
    return this.deleteTrainStationUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
