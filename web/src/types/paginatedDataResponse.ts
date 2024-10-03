import { Data } from "./data";

export interface PaginatedDataResponse {
  data: Data[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}