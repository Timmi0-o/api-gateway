export interface ICreateServicePricingBody {
  serviceId: string;
  currencyId: string;
  price: string;
  effectiveFrom: string;
  effectiveTo?: string | null;
}
