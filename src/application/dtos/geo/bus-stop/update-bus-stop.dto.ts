import { ITransportBase } from '@application/dtos/geo/types';

export interface IUpdateBusStopDto extends Partial<ITransportBase> {
  slugOrId: string;
}
