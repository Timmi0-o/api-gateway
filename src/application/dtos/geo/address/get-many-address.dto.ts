import { AddressPreset } from './get-one-address.dto';

export interface IGetManyAddressDto {
  limit?: number;
  page?: number;
  offset?: number;
  preset?: AddressPreset;
  filter?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc'>;
}
