import { ITransportBase } from '@application/dtos/geo/types';

export interface IUpdateTrainStationDto extends Partial<ITransportBase> {
  slugOrId: string;
}
