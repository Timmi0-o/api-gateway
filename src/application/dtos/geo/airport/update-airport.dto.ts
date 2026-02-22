import { ITransportBase } from '@application/dtos/geo/types';

export interface IUpdateAirportDto extends Partial<ITransportBase> {
  slugOrId: string;
}
