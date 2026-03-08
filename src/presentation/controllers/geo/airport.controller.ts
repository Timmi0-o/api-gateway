import { ICreateAirportDto } from '@application/dtos/geo/airport/create-airport.dto';
import { IUpdateAirportDto } from '@application/dtos/geo/airport/update-airport.dto';
import { IBaseArrayQuery, IBaseQuery } from '@application/dtos/geo/query.dto';
import { IAirportResponse } from '@application/dtos/geo/response/airport.response';
import { CreateAirportUseCase } from '@application/use-cases/geo/airport/create/create.usecase';
import { DeleteAirportUseCase } from '@application/use-cases/geo/airport/delete/delete.usecase';
import { GetAirportsUseCase } from '@application/use-cases/geo/airport/get-many/get-many.usecase';
import { GetAirportUseCase } from '@application/use-cases/geo/airport/get-one/get-one.usecase';
import { UpdateAirportUseCase } from '@application/use-cases/geo/airport/update/update.usecase';
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

@Controller({ path: 'geo/airports', version: '1' })
export class AirportController {
  constructor(
    private readonly getAirportUseCase: GetAirportUseCase,
    private readonly getAirportsUseCase: GetAirportsUseCase,
    private readonly createAirportUseCase: CreateAirportUseCase,
    private readonly updateAirportUseCase: UpdateAirportUseCase,
    private readonly deleteAirportUseCase: DeleteAirportUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IBaseArrayQuery,
  ): Promise<IAirportResponse[]> {
    return this.getAirportsUseCase.execute({
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
  ): Promise<IAirportResponse> {
    return this.getAirportUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateAirportDto,
  ): Promise<IAirportResponse> {
    return this.createAirportUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateAirportDto, 'slugOrId'>,
  ): Promise<IAirportResponse> {
    return this.updateAirportUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<IAirportResponse> {
    return this.deleteAirportUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
