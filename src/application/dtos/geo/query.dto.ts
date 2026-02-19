export interface IGeoQueryDto {
  limit?: number;
  offset?: number;
  preset?: string;
  filter?: Record<string, unknown>;
  orderBy?: Record<string, 'asc' | 'desc'>;
  include?: string[];
  select?: string[];
}
