import { ICreateBusStopDto } from '@application/dtos/geo/bus-stop/create-bus-stop.dto';
import { IUpdateBusStopDto } from '@application/dtos/geo/bus-stop/update-bus-stop.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { IBusStopResponse } from '@application/dtos/geo/response/bus-stop.response';
import { CreateBusStopUseCase } from '@application/use-cases/geo/bus-stop/create/create.usecase';
import { DeleteBusStopUseCase } from '@application/use-cases/geo/bus-stop/delete/delete.usecase';
import { GetBusStopsUseCase } from '@application/use-cases/geo/bus-stop/get-many/get-many.usecase';
import { GetBusStopUseCase } from '@application/use-cases/geo/bus-stop/get-one/get-one.usecase';
import { UpdateBusStopUseCase } from '@application/use-cases/geo/bus-stop/update/update.usecase';
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

@Controller({ path: 'geo/bus-stops', version: '1' })
export class BusStopController {
  constructor(
    private readonly getBusStopUseCase: GetBusStopUseCase,
    private readonly getBusStopsUseCase: GetBusStopsUseCase,
    private readonly createBusStopUseCase: CreateBusStopUseCase,
    private readonly updateBusStopUseCase: UpdateBusStopUseCase,
    private readonly deleteBusStopUseCase: DeleteBusStopUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<IBusStopResponse[]> {
    return this.getBusStopsUseCase.execute({
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
  ): Promise<IBusStopResponse> {
    return this.getBusStopUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateBusStopDto,
  ): Promise<IBusStopResponse> {
    return this.createBusStopUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateBusStopDto, 'slugOrId'>,
  ): Promise<IBusStopResponse> {
    return this.updateBusStopUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IBusStopResponse> {
    return this.deleteBusStopUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
