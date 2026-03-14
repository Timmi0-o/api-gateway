export interface ICreateTariffDto {
  propertyId: string;
  status: string;
  priority: number;
  name: string;
  shortDescription: string;
  description: string;
  cancellationRuleId?: string | null;
  overstayRuleId?: string | null;
  roundingRuleId?: string | null;
}

export type IUpdateTariffDto = Partial<ICreateTariffDto>;
