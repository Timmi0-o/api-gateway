import { ICreateCountryDto } from '@application/dtos/geo/country/create-country.dto';
import { IUpdateCountryDto } from '@application/dtos/geo/country/update-country.dto';
import { IBaseQuery, IRawArrayQuery } from '@application/dtos/geo/query.dto';
import { ICountryResponse } from '@application/dtos/geo/response/country.response';
import { CreateCountryUseCase } from '@application/use-cases/geo/country/create/create.usecase';
import { DeleteCountryUseCase } from '@application/use-cases/geo/country/delete/delete.usecase';
import { GetCountriesUseCase } from '@application/use-cases/geo/country/get-many/get-many.usecase';
import { GetCountryUseCase } from '@application/use-cases/geo/country/get-one/get-one.usecase';
import { UpdateCountryUseCase } from '@application/use-cases/geo/country/update/update.usecase';
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

@Controller({ path: 'geo/countries', version: '1' })
export class CountryController {
  constructor(
    private readonly getCountryUseCase: GetCountryUseCase,
    private readonly getCountriesUseCase: GetCountriesUseCase,
    private readonly createCountryUseCase: CreateCountryUseCase,
    private readonly updateCountryUseCase: UpdateCountryUseCase,
    private readonly deleteCountryUseCase: DeleteCountryUseCase,
  ) {}

  @Get()
  @PublicEndpoint()
  async getMany(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Query() query: IRawArrayQuery,
  ): Promise<ICountryResponse[]> {
    return this.getCountriesUseCase.execute({ data: query, metadata });
  }

  @Get(':id')
  @PublicEndpoint()
  async getOne(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Query() query: IBaseQuery,
  ): Promise<ICountryResponse> {
    return this.getCountryUseCase.execute({
      data: { slugOrId: id, preset: query.preset ?? 'BASE' },
      metadata,
    });
  }

  @Post()
  @UseGuards(RsaAuthGuard)
  async create(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Body() data: ICreateCountryDto,
  ): Promise<ICountryResponse> {
    return this.createCountryUseCase.execute({ data, metadata });
  }

  @Patch(':id')
  @UseGuards(RsaAuthGuard)
  async update(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
    @Body() body: Omit<IUpdateCountryDto, 'slugOrId'>,
  ): Promise<ICountryResponse> {
    return this.updateCountryUseCase.execute({
      data: { slugOrId: id, ...body },
      metadata,
    });
  }

  @Delete(':id')
  @UseGuards(RsaAuthGuard)
  async delete(
    @GetMetadataObjectForGrpcRequest() metadata: IMetadataObjectForGrpcRequest,
    @Param('id') id: string,
  ): Promise<ICountryResponse> {
    return this.deleteCountryUseCase.execute({ data: { slugOrId: id }, metadata });
  }
}
