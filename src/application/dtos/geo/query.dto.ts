/** Query-параметры для запроса одного объекта (get-one) */
export interface IBaseQuery {
  preset?: string;
}

/** Query-параметры для запроса списка (get-many): preset, пагинация, filter/orderBy как JSON-строки */
export interface IBaseArrayQuery {
  preset?: string;
  limit?: number;
  page?: number;
  filter?: string;
  orderBy?: string;
  requiredIds?: string;
}

export type IRawArrayQuery = IBaseArrayQuery & Record<string, unknown>;

export type { INormalizedArrayQuery } from '@shared/utils/split-array-query-params';
