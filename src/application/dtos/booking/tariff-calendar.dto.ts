export interface ICreateTariffCalendarDto {
  tariffId: string;
  unitId: string;
  date: string;
  available: boolean;
  minLos?: number | null;
  maxLos?: number | null;
  minLosArrival?: number | null;
  maxLosArrival?: number | null;
  fullPatternLos?: number | null;
  minAdvBooking?: number | null;
  maxAdvBooking?: number | null;
  cta?: number | null;
  ctd?: number | null;
  overstayRuleId?: string | null;
  paymentMethodId?: string | null;
}

export type IUpdateTariffCalendarDto = Partial<ICreateTariffCalendarDto>;
