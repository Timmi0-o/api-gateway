export interface ICreatePropertyDto {
  typeId: string;
  currencyId: string;
  registerId: string;
  status: string;
  name: string;
  enName: string;
  rate: number;
  description: string;
  logoImageId?: string;
  bookMailFile?: string;
  personalDataExp: string;
  checkTimes: object;
  bookingTimeLimit: object;
  minPrice: number;
  weekend: object;
  addressId: string;
  phones: object;
  emails: object;
}

export type IUpdatePropertyDto = Partial<ICreatePropertyDto>;
