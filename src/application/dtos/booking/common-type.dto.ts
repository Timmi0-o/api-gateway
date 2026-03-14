export interface ICreateCommonTypeDto {
  type: string;
  name: string;
}

export type IUpdateCommonTypeDto = Partial<ICreateCommonTypeDto>;
