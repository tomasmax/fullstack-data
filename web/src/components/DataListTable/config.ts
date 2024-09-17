export interface Data {
  id: number;
  status: string;
  createdOn?: Date;
  name: string;
  description?: string;
  delta?: number | string;
}

export type SortOrder = "asc" | "desc";
export type SortField = keyof Data | null;

export const SORT_ORDER: { ASC: SortOrder; DESC: SortOrder } = {
  ASC: "asc",
  DESC: "desc",
};
