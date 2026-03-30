export interface ICreateOrganizationTariffLineBody {
  organizationTariffId: string;
  serviceId: string;
  count: number;
  itemPrice: string;
  currencyId: string;
}
