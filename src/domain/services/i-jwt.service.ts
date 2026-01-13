export interface IJwtService {
  verify(token: string): Promise<Record<string, unknown>>;
  decode(token: string): Record<string, unknown>;
}
