export interface Data {
  id: number;
  status: string;
  createdOn?: Date;
  name: string;
  description?: string;
  delta?: number | string;
}

export type SortOrder = "asc" | "desc";
export type Header = keyof Data;
export type SortField = Header | null;


export const SORT_ORDER: { ASC: SortOrder; DESC: SortOrder } = {
  ASC: "asc",
  DESC: "desc",
};

export const DEFAULT_HEADERS: Header[] = [
  "id",
  "name",
  "status",
  "description",
  "delta",
  "createdOn",
];
