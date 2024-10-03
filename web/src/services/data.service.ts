import axios from 'axios';
import { PaginatedDataResponse } from '../types/paginatedDataResponse';

const DATA_ENDPOINT = "http://localhost:3000/data";

export interface FetchDataParams {
  status?: string;
  name?: string;
  limit?: number;
  page: number;
}

export const fetchData = async ({ status, name, limit, page }: FetchDataParams): Promise<PaginatedDataResponse> => {
  const response = await axios.get<PaginatedDataResponse>(DATA_ENDPOINT, {
    params: {
      ...(status && { status }),
      ...(name && { search: name }),
      ...(limit && { limit }),
      page,
    }
  });
  if (!response.data) {
    throw new Error('Empty data');
  }
  return response.data;
};