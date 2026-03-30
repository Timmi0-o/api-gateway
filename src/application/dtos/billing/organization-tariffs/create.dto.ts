export interface ICreateOrganizationTariffBody {
  organizationId: string;
  status: string;
  startDate: string;
  endDate?: string | null;
  purchasedAt?: string | null;
  discountId?: string | null;
}
