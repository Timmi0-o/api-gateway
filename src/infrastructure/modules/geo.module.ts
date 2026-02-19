import { CreateCountryUseCase } from '@application/use-cases/geo/country/create/create.usecase';
import { DeleteCountryUseCase } from '@application/use-cases/geo/country/delete/delete.usecase';
import { GetCountriesUseCase } from '@application/use-cases/geo/country/get-many/get-many.usecase';
import { GetCountryUseCase } from '@application/use-cases/geo/country/get-one/get-one.usecase';
import { UpdateCountryUseCase } from '@application/use-cases/geo/country/update/update.usecase';
import { CreateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/create/create.usecase';
import { DeleteDistrictRegionUseCase } from '@application/use-cases/geo/district-region/delete/delete.usecase';
import { GetDistrictRegionsUseCase } from '@application/use-cases/geo/district-region/get-many/get-many.usecase';
import { GetDistrictRegionUseCase } from '@application/use-cases/geo/district-region/get-one/get-one.usecase';
import { UpdateDistrictRegionUseCase } from '@application/use-cases/geo/district-region/update/update.usecase';
import { CreateLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/create/create.usecase';
import { DeleteLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/delete/delete.usecase';
import { GetLocalityDistrictsUseCase } from '@application/use-cases/geo/locality-district/get-many/get-many.usecase';
import { GetLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/get-one/get-one.usecase';
import { UpdateLocalityDistrictUseCase } from '@application/use-cases/geo/locality-district/update/update.usecase';
import { CreateLocalityUseCase } from '@application/use-cases/geo/locality/create/create.usecase';
import { DeleteLocalityUseCase } from '@application/use-cases/geo/locality/delete/delete.usecase';
import { GetLocalitiesUseCase } from '@application/use-cases/geo/locality/get-many/get-many.usecase';
import { GetLocalityUseCase } from '@application/use-cases/geo/locality/get-one/get-one.usecase';
import { UpdateLocalityUseCase } from '@application/use-cases/geo/locality/update/update.usecase';
import { CreateRegionUseCase } from '@application/use-cases/geo/region/create/create.usecase';
import { DeleteRegionUseCase } from '@application/use-cases/geo/region/delete/delete.usecase';
import { GetRegionsUseCase } from '@application/use-cases/geo/region/get-many/get-many.usecase';
import { GetRegionUseCase } from '@application/use-cases/geo/region/get-one/get-one.usecase';
import { UpdateRegionUseCase } from '@application/use-cases/geo/region/update/update.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { CountryController } from '@presentation/controllers/geo/country.controller';
import { DistrictRegionController } from '@presentation/controllers/geo/district-region.controller';
import { LocalityDistrictController } from '@presentation/controllers/geo/locality-district.controller';
import { LocalityController } from '@presentation/controllers/geo/locality.controller';
import { RegionController } from '@presentation/controllers/geo/region.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.GEO_CLIENT)],
  controllers: [
    CountryController,
    RegionController,
    LocalityController,
    LocalityDistrictController,
    DistrictRegionController,
  ],
  providers: [
    {
      provide: GetCountryUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetCountryUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetCountriesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetCountriesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateCountryUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateCountryUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateCountryUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateCountryUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteCountryUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteCountryUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetRegionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetRegionsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetLocalityUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetLocalityUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetLocalitiesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetLocalitiesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateLocalityUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateLocalityUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateLocalityUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateLocalityUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteLocalityUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteLocalityUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetLocalityDistrictUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetLocalityDistrictUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetLocalityDistrictsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetLocalityDistrictsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateLocalityDistrictUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateLocalityDistrictUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateLocalityDistrictUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateLocalityDistrictUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteLocalityDistrictUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteLocalityDistrictUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetDistrictRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetDistrictRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetDistrictRegionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetDistrictRegionsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateDistrictRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateDistrictRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateDistrictRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateDistrictRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteDistrictRegionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteDistrictRegionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class GeoModule {}
