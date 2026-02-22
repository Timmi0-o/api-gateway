import { ITransportBase } from '@application/dtos/geo/types';

export interface IUpdateWharfDto extends Partial<ITransportBase> {
  slugOrId: string;
}
