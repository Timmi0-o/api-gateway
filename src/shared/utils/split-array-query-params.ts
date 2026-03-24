/** Результат разбора query: верхний уровень + filter из остальных полей */
export interface INormalizedArrayQuery {
  preset: string;
  limit: number;
  page: number;
  orderBy?: Record<string, 'asc' | 'desc'>;
  filter?: Record<string, unknown>;
  requiredIds?: string[];
}

const RESERVED_KEYS = new Set(['preset', 'limit', 'page', 'orderBy', 'filter']);

function toNumber(value: unknown, fallback: number): number {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  const parsed = typeof value === 'string' ? Number(value) : Number.NaN;
  return Number.isNaN(parsed) ? fallback : parsed;
}

function parseOrderBy(value: unknown): Record<string, 'asc' | 'desc'> | undefined {
  if (value === undefined || value === null) return undefined;
  const str = typeof value === 'string' ? value : undefined;
  if (!str) return undefined;
  try {
    const parsed = JSON.parse(str) as Record<string, unknown>;
    if (parsed === null || typeof parsed !== 'object') return undefined;
    const result: Record<string, 'asc' | 'desc'> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (v === 'asc' || v === 'desc') result[k] = v;
    }
    return Object.keys(result).length ? result : undefined;
  } catch {
    return undefined;
  }
}

function parseFilterJson(value: unknown): Record<string, unknown> | undefined {
  if (value === undefined || value === null) return undefined;
  const str = typeof value === 'string' ? value : undefined;
  if (!str) return undefined;
  try {
    const parsed = JSON.parse(str);
    return parsed !== null && typeof parsed === 'object'
      ? (parsed as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

function deepParseJson(value: unknown): unknown {
  if (value === undefined || value === null) return value;
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (
      (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))
    ) {
      try {
        return deepParseJson(JSON.parse(value));
      } catch {
        return value;
      }
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(deepParseJson);
  }
  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = deepParseJson(v);
    }
    return result;
  }
  return value;
}

export function splitArrayQueryParams(query: Record<string, unknown>): INormalizedArrayQuery {
  if (typeof query === 'string') {
    query = JSON.parse(query) as Record<string, unknown>;
  }

  const filterFromQueryRaw = parseFilterJson(query.filter);
  const filterFromQuery =
    filterFromQueryRaw && Object.keys(filterFromQueryRaw).length > 0
      ? (deepParseJson(filterFromQueryRaw) as Record<string, unknown>)
      : undefined;

  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(query)) {
    if (RESERVED_KEYS.has(key)) continue;
    if (value === undefined || value === null) continue;
    const raw = Array.isArray(value) && value.length === 1 ? value[0] : value;
    rest[key] = deepParseJson(raw);
  }
  const filter =
    filterFromQuery || Object.keys(rest).length > 0 ? { ...filterFromQuery, ...rest } : undefined;

  const presetRaw = query.preset;
  const preset = typeof presetRaw === 'string' && presetRaw.length > 0 ? presetRaw : 'BASE';

  return {
    preset,
    limit: toNumber(query.limit, 25),
    page: toNumber(query.page, 1),
    orderBy: parseOrderBy(query.orderBy),
    filter: filter && Object.keys(filter).length > 0 ? { ...filter } : undefined,
    ...(query.requiredIds
      ? { requiredIds: Array.isArray(query.requiredIds) ? query.requiredIds : [query.requiredIds] }
      : {}),
  };
}
