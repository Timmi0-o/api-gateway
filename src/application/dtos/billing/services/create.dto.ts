export interface ICreateServiceBody {
  name: string;
  description?: string | null;
  type: string;
  module: string;
  isCountable: boolean;
  defaultCount?: number | null;
  isActive: boolean;
}
