export interface IRegisterRequestBookingTariffDto {
  property: { name: string };
  unit: { name: string };
  unitsCount: number;
}

export interface IRegisterRequestTariffsDto {
  payment_period: number;
  modules: {
    booking: IRegisterRequestBookingTariffDto;
  };
  membersCount: number;
  additional: {
    messenger: boolean;
    onlineChats: number;
    siteConstructors: number;
  };
  integrations: {
    oneC: boolean;
    amoCRM: boolean;
  };
}

export interface IUpdateRegisterRequestTariffsBodyDto {
  tariffs: IRegisterRequestTariffsDto;
}
