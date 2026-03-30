export interface ICreateDiscountBody {
  code?: string | null;
  type: string;
  value: string;
  currencyId?: string | null;
  serviceId?: string | null;
  organizationId?: string | null;
  usageLimit?: number | null;
  usageCount?: number;
  validFrom: string;
  validTo?: string | null;
  isActive: boolean;
  minPrepaidMonths?: number | null;
  applicationScope?: string;
}
