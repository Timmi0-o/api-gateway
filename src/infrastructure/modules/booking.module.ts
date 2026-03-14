import { CreatePropertyUseCase } from '@application/use-cases/booking/properties/create/create.usecase';
import { GetPropertiesUseCase } from '@application/use-cases/booking/properties/get-many/get-many.usecase';
import { GetPropertyUseCase } from '@application/use-cases/booking/properties/get-one/get-one.usecase';
import { SoftDeletePropertyUseCase } from '@application/use-cases/booking/properties/soft-delete/soft-delete.usecase';
import { UpdatePropertyUseCase } from '@application/use-cases/booking/properties/update/update.usecase';
import { CreateUnitUseCase } from '@application/use-cases/booking/units/create/create.usecase';
import { GetUnitsUseCase } from '@application/use-cases/booking/units/get-many/get-many.usecase';
import { GetUnitUseCase } from '@application/use-cases/booking/units/get-one/get-one.usecase';
import { SoftDeleteUnitUseCase } from '@application/use-cases/booking/units/soft-delete/soft-delete.usecase';
import { UpdateUnitUseCase } from '@application/use-cases/booking/units/update/update.usecase';
import { CreateTariffUseCase } from '@application/use-cases/booking/tariffs/create/create.usecase';
import { DeleteTariffUseCase } from '@application/use-cases/booking/tariffs/delete/delete.usecase';
import { GetTariffsUseCase } from '@application/use-cases/booking/tariffs/get-many/get-many.usecase';
import { GetTariffUseCase } from '@application/use-cases/booking/tariffs/get-one/get-one.usecase';
import { UpdateTariffUseCase } from '@application/use-cases/booking/tariffs/update/update.usecase';
import { CreateTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/create/create.usecase';
import { DeleteTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/delete/delete.usecase';
import { GetTariffCalendarsUseCase } from '@application/use-cases/booking/tariff-calendars/get-many/get-many.usecase';
import { GetTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/get-one/get-one.usecase';
import { UpdateTariffCalendarUseCase } from '@application/use-cases/booking/tariff-calendars/update/update.usecase';
import { CreateTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/create/create.usecase';
import { DeleteTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/delete/delete.usecase';
import { GetTariffCalendarPlacesUseCase } from '@application/use-cases/booking/tariff-calendar-places/get-many/get-many.usecase';
import { GetTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/get-one/get-one.usecase';
import { UpdateTariffCalendarPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-places/update/update.usecase';
import { CreateTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/create/create.usecase';
import { DeleteTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/delete/delete.usecase';
import { GetTariffCalendarChildrenPlacesUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/get-many/get-many.usecase';
import { GetTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/get-one/get-one.usecase';
import { UpdateTariffCalendarChildrenPlaceUseCase } from '@application/use-cases/booking/tariff-calendar-children-places/update/update.usecase';
import { CreateCommonTypeUseCase } from '@application/use-cases/booking/common-types/create/create.usecase';
import { DeleteCommonTypeUseCase } from '@application/use-cases/booking/common-types/delete/delete.usecase';
import { GetCommonTypesUseCase } from '@application/use-cases/booking/common-types/get-many/get-many.usecase';
import { GetCommonTypeUseCase } from '@application/use-cases/booking/common-types/get-one/get-one.usecase';
import { UpdateCommonTypeUseCase } from '@application/use-cases/booking/common-types/update/update.usecase';
import { CreatePropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/create-many/create-many.usecase';
import { GetPropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/get-many/get-many.usecase';
import { GetPropertyAccessPermissionUseCase } from '@application/use-cases/booking/property-access-permissions/get-one/get-one.usecase';
import { SoftDeletePropertyAccessPermissionsUseCase } from '@application/use-cases/booking/property-access-permissions/soft-delete-many/soft-delete-many.usecase';
import { UpdatePropertyAccessPermissionUseCase } from '@application/use-cases/booking/property-access-permissions/update/update.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { CommonTypesController } from '@presentation/controllers/booking/common-types.controller';
import { PropertiesController } from '@presentation/controllers/booking/properties.controller';
import { PropertyAccessPermissionsController } from '@presentation/controllers/booking/property-access-permissions.controller';
import { TariffCalendarChildrenPlacesController } from '@presentation/controllers/booking/tariff-calendar-children-places.controller';
import { TariffCalendarPlacesController } from '@presentation/controllers/booking/tariff-calendar-places.controller';
import { TariffCalendarsController } from '@presentation/controllers/booking/tariff-calendars.controller';
import { TariffsController } from '@presentation/controllers/booking/tariffs.controller';
import { UnitsController } from '@presentation/controllers/booking/units.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT)],
  controllers: [
    PropertiesController,
    UnitsController,
    TariffsController,
    TariffCalendarsController,
    TariffCalendarPlacesController,
    TariffCalendarChildrenPlacesController,
    CommonTypesController,
    PropertyAccessPermissionsController,
  ],
  providers: [
    {
      provide: GetPropertiesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetPropertiesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetPropertyUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetPropertyUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreatePropertyUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreatePropertyUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdatePropertyUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdatePropertyUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeletePropertyUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new SoftDeletePropertyUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetUnitsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetUnitsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetUnitUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetUnitUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateUnitUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreateUnitUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateUnitUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdateUnitUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeleteUnitUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new SoftDeleteUnitUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreateTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdateTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new DeleteTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffCalendarsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffCalendarUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateTariffCalendarUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreateTariffCalendarUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateTariffCalendarUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdateTariffCalendarUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteTariffCalendarUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new DeleteTariffCalendarUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarPlacesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffCalendarPlacesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetTariffCalendarPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateTariffCalendarPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreateTariffCalendarPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateTariffCalendarPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdateTariffCalendarPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteTariffCalendarPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new DeleteTariffCalendarPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarChildrenPlacesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetTariffCalendarChildrenPlacesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetTariffCalendarChildrenPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetTariffCalendarChildrenPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateTariffCalendarChildrenPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateTariffCalendarChildrenPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateTariffCalendarChildrenPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateTariffCalendarChildrenPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteTariffCalendarChildrenPlaceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteTariffCalendarChildrenPlaceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetCommonTypesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetCommonTypesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetCommonTypeUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new GetCommonTypeUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateCommonTypeUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new CreateCommonTypeUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateCommonTypeUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new UpdateCommonTypeUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteCommonTypeUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) => new DeleteCommonTypeUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetPropertyAccessPermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetPropertyAccessPermissionsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetPropertyAccessPermissionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetPropertyAccessPermissionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreatePropertyAccessPermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreatePropertyAccessPermissionsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdatePropertyAccessPermissionUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdatePropertyAccessPermissionUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeletePropertyAccessPermissionsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new SoftDeletePropertyAccessPermissionsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class BookingModule {}
