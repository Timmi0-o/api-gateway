import { CreateBillingServiceUseCase } from '@application/use-cases/billing/services/create.usecase';
import { DeleteBillingServicesUseCase } from '@application/use-cases/billing/services/delete-many.usecase';
import { GetBillingServiceUseCase } from '@application/use-cases/billing/services/get-one.usecase';
import { GetBillingServicesUseCase } from '@application/use-cases/billing/services/get-many.usecase';
import { UpdateBillingServiceUseCase } from '@application/use-cases/billing/services/update.usecase';
import { CreateServicePricingUseCase } from '@application/use-cases/billing/service-pricings/create.usecase';
import { GetServicePricingUseCase } from '@application/use-cases/billing/service-pricings/get-one.usecase';
import { GetServicePricingsUseCase } from '@application/use-cases/billing/service-pricings/get-many.usecase';
import { SoftDeleteServicePricingUseCase } from '@application/use-cases/billing/service-pricings/soft-delete.usecase';
import { CreateOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/create.usecase';
import { GetOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/get-one.usecase';
import { GetOrganizationTariffsUseCase } from '@application/use-cases/billing/organization-tariffs/get-many.usecase';
import { SoftDeleteOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/soft-delete.usecase';
import { UpdateOrganizationTariffUseCase } from '@application/use-cases/billing/organization-tariffs/update.usecase';
import { CreateOrganizationTariffLineUseCase } from '@application/use-cases/billing/organization-tariff-lines/create.usecase';
import { GetOrganizationTariffLineUseCase } from '@application/use-cases/billing/organization-tariff-lines/get-one.usecase';
import { GetOrganizationTariffLinesUseCase } from '@application/use-cases/billing/organization-tariff-lines/get-many.usecase';
import { CreateDiscountUseCase } from '@application/use-cases/billing/discounts/create.usecase';
import { GetDiscountUseCase } from '@application/use-cases/billing/discounts/get-one.usecase';
import { GetDiscountsUseCase } from '@application/use-cases/billing/discounts/get-many.usecase';
import { SoftDeleteDiscountUseCase } from '@application/use-cases/billing/discounts/soft-delete.usecase';
import { UpdateDiscountUseCase } from '@application/use-cases/billing/discounts/update.usecase';
import { IMicroserviceClientProxyService } from '@domain/services/i-microservice-client-proxy.service';
import {
  MICROSERVICE_CLIENT_PROXY_SERVICE,
  MicroserviceClientProxyModule,
} from '@infrastructure/services/microservice-client-proxy/microservice-client-proxy.module';
import { Module } from '@nestjs/common';
import { BillingDiscountsController } from '@presentation/controllers/billing/discounts.controller';
import { BillingOrganizationTariffLinesController } from '@presentation/controllers/billing/organization-tariff-lines.controller';
import { BillingOrganizationTariffsController } from '@presentation/controllers/billing/organization-tariffs.controller';
import { BillingServicePricingsController } from '@presentation/controllers/billing/service-pricings.controller';
import { BillingServicesController } from '@presentation/controllers/billing/services.controller';
import { NATS_CLIENTS } from '@shared/constants/nats-clients';

@Module({
  imports: [MicroserviceClientProxyModule.register(NATS_CLIENTS.ORGANIZATION_CLIENT)],
  controllers: [
    BillingServicesController,
    BillingServicePricingsController,
    BillingOrganizationTariffsController,
    BillingOrganizationTariffLinesController,
    BillingDiscountsController,
  ],
  providers: [
    {
      provide: GetBillingServicesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetBillingServicesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetBillingServiceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetBillingServiceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateBillingServiceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateBillingServiceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateBillingServiceUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateBillingServiceUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: DeleteBillingServicesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new DeleteBillingServicesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetServicePricingsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetServicePricingsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetServicePricingUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetServicePricingUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateServicePricingUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateServicePricingUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeleteServicePricingUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new SoftDeleteServicePricingUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationTariffsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetOrganizationTariffsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetOrganizationTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateOrganizationTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateOrganizationTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateOrganizationTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeleteOrganizationTariffUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new SoftDeleteOrganizationTariffUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationTariffLinesUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetOrganizationTariffLinesUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetOrganizationTariffLineUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetOrganizationTariffLineUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateOrganizationTariffLineUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateOrganizationTariffLineUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetDiscountsUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetDiscountsUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: GetDiscountUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new GetDiscountUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: CreateDiscountUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new CreateDiscountUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: UpdateDiscountUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new UpdateDiscountUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
    {
      provide: SoftDeleteDiscountUseCase,
      useFactory: (clientProxy: IMicroserviceClientProxyService) =>
        new SoftDeleteDiscountUseCase(clientProxy),
      inject: [MICROSERVICE_CLIENT_PROXY_SERVICE],
    },
  ],
})
export class BillingModule {}
