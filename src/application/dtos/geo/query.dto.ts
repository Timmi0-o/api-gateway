/** Query-параметры для запроса одного объекта (get-one) */
export interface IBaseQuery {
  preset?: string;
}

/** Query-параметры для запроса списка (get-many): preset, пагинация, filter/orderBy как JSON-строки */
export interface IBaseArrayQuery {
  preset?: string;
  limit?: number;
  page?: number;
  offset?: number;
  filter?: string;
  orderBy?: string;
  include?: string[];
  select?: string[];
}
