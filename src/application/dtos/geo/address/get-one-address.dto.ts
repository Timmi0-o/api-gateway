import { IBaseQuery } from '@application/dtos/geo/query.dto';

export type AddressPreset = 'MINIMAL' | 'SHORT' | 'BASE';

export interface IGetOneAddressDto {
  entityId: string;
  entityType: string;
  preset?: AddressPreset;
}

/** Query-параметры GET by-entity для адреса */
export interface IAddressGetOneQuery extends IBaseQuery {
  entityId: string;
  entityType: string;
}
