export interface Data {
  id: number;
  status: string;
  createdOn?: Date;
  name: string;
  description?: string;
  delta?: number | string;
}