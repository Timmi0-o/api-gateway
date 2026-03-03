import { CreateAirportUseCase } from '@application/use-cases/geo/airport/create/create.usecase';
import { DeleteAirportUseCase } from '@application/use-cases/geo/airport/delete/delete.usecase';
import { GetAirportsUseCase } from '@application/use-cases/geo/airport/get-many/get-many.usecase';
import { GetAirportUseCase } from '@application/use-cases/geo/airport/get-one/get-one.usecase';
import { UpdateAirportUseCase } from '@application/use-cases/geo/airport/update/update.usecase';
import { CreateBusStopUseCase } from '@application/use-cases/geo/bus-stop/create/create.usecase';
import { DeleteBusStopUseCase } from '@application/use-cases/geo/bus-stop/delete/delete.usecase';
import { GetBusStopsUseCase } from '@application/use-cases/geo/bus-stop/get-many/get-many.usecase';
import { GetBusStopUseCase } from '@application/use-cases/geo/bus-stop/get-one/get-one.usecase';
import { UpdateBusStopUseCase } from '@application/use-cases/geo/bus-stop/update/update.usecase';
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
import { CreateTrainStationUseCase } from '@application/use-cases/geo/train-station/create/create.usecase';
import { DeleteTrainStationUseCase } from '@application/use-cases/geo/train-station/delete/delete.usecase';
import { GetTrainStationsUseCase } from '@application/use-cases/geo/train-station/get-many/get-many.usecase';
import { GetTrainStationUseCase } from '@application/use-cases/geo/train-station/get-one/get-one.usecase';
import { UpdateTrainStationUseCase } from '@application/use-cases/geo/train-station/update/update.usecase';
import { CreateWharfUseCase } from '@application/use-cases/geo/wharf/create/create.usecase';
import { DeleteWharfUseCase } from '@application/use-cases/geo/wharf/delete/delete.usecase';
import { GetWharvesUseCase } from '@application/use-cases/geo/wharf/get-many/get-many.usecase';
import { GetWharfUseCase } from '@application/use-cases/geo/wharf/get-one/get-one.usecase';
import { UpdateWharfUseCase } from '@application/use-cases/geo/wharf/update/update.usecase';
import { CreateAddressUseCase } from '@application/use-cases/geo/address/create/create.usecase';
import { DeleteAddressUseCase } from '@application/use-cases/geo/address/delete/delete.usecase';
import { GetAddressesUseCase } from '@application/use-cases/geo/address/get-many/get-many.usecase';
import { GetAddressUseCase } from '@application/use-cases/geo/address/get-one/get-one.usecase';
import { UpdateAddressUseCase } from '@application/use-cases/geo/address/update/update.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { AddressController } from '@presentation/controllers/geo/address.controller';
import { AirportController } from '@presentation/controllers/geo/airport.controller';
import { BusStopController } from '@presentation/controllers/geo/bus-stop.controller';
import { CountryController } from '@presentation/controllers/geo/country.controller';
import { DistrictRegionController } from '@presentation/controllers/geo/district-region.controller';
import { LocalityDistrictController } from '@presentation/controllers/geo/locality-district.controller';
import { LocalityController } from '@presentation/controllers/geo/locality.controller';
import { RegionController } from '@presentation/controllers/geo/region.controller';
import { TrainStationController } from '@presentation/controllers/geo/train-station.controller';
import { WharfController } from '@presentation/controllers/geo/wharf.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.GEO_CLIENT)],
  controllers: [
    AddressController,
    CountryController,
    RegionController,
    LocalityController,
    LocalityDistrictController,
    DistrictRegionController,
    AirportController,
    BusStopController,
    TrainStationController,
    WharfController,
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
    {
      provide: GetAirportUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetAirportUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetAirportsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetAirportsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateAirportUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateAirportUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateAirportUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateAirportUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteAirportUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteAirportUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetBusStopUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetBusStopUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetBusStopsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetBusStopsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateBusStopUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateBusStopUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateBusStopUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateBusStopUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteBusStopUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteBusStopUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTrainStationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetTrainStationUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTrainStationsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetTrainStationsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateTrainStationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateTrainStationUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateTrainStationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateTrainStationUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteTrainStationUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteTrainStationUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetWharfUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetWharfUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetWharvesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetWharvesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateWharfUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateWharfUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateWharfUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateWharfUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteWharfUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteWharfUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetAddressUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetAddressUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetAddressesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetAddressesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateAddressUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateAddressUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateAddressUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateAddressUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteAddressUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteAddressUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class GeoModule {}
