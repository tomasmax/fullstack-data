import React, { useCallback, useEffect, useState } from "react";
import DataListTable from "../../components/DataListTable/DataListTable";
import Pagination from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Filters from "../../components/Filters/Filters";
import type { Data } from "../../types/data";
import { fetchData, FetchDataParams } from "../../services/data.service";
import type { PaginatedDataResponse } from "../../types/paginatedDataResponse";

const INPUT_DEBOUNCE_TIME = 300;

function PaginatedTableContainer() {
  const [data, setData] = useState<Data[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedNameFilter] = useDebounce(nameFilter, INPUT_DEBOUNCE_TIME);

  const getData = useCallback(
    async ({ page, status, name, limit }: FetchDataParams) => {
      setLoading(true);
      setError(null);
      try {
        const response: PaginatedDataResponse = await fetchData({
          status,
          name,
          limit,
          page,
        });

        setData(response.data);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setCurrentPage(response.currentPage);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getData({
      page: currentPage,
      status: statusFilter,
      name: debouncedNameFilter,
      limit: itemsPerPage,
    });
  }, [currentPage, statusFilter, debouncedNameFilter, itemsPerPage, getData]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleStatusFilterChange = (newStatus: string) => {
    setStatusFilter(newStatus);
    setCurrentPage(1);
  };

  const handleNameFilterChange = useCallback((newName: string) => {
    setNameFilter(newName);
    setCurrentPage(1);
  }, []);

  return (
    <div className="paginatedTableContainer">
      <Filters
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        onNameFilterChange={handleNameFilterChange}
        totalItems={totalItems}
      />
      {loading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <DataListTable data={data} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={setItemsPerPage}
          />
        </>
      )}
    </div>
  );
}

export default PaginatedTableContainer;
