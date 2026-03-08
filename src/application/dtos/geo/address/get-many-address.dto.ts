import { AddressPreset } from './get-one-address.dto';

export interface IGetManyAddressDto {
  limit?: number;
  page?: number;
  preset?: AddressPreset;
  filter?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc'>;
}
