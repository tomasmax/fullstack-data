import { useCallback, useMemo, useState } from "react";
import "./PaginatedTableContainer.css";
import DataListTable from "../../components/DataListTable/DataListTable";
import Pagination from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Filters from "../../components/Filters/Filters";
import useFetch from "../../hooks/useFetch";
import type { PaginatedDataResponse } from "../../types/paginatedDataResponse";

const INPUT_DEBOUNCE_TIME = 300;
const API_URL = "/data";

function PaginatedTableContainer() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [debouncedNameFilter] = useDebounce(nameFilter, INPUT_DEBOUNCE_TIME);

  const options = useMemo(
    () => ({
      params: {
        status: statusFilter,
        search: debouncedNameFilter,
        limit: itemsPerPage,
        page: currentPage,
      },
    }),
    [statusFilter, debouncedNameFilter, itemsPerPage, currentPage]
  );

  const { data, loading, error } = useFetch<PaginatedDataResponse>(
    API_URL,
    "GET",
    options
  );

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
        totalItems={data?.totalItems || 0}
      />
      <div className="paginatedTableContainer-content">
        {error ? (
          <p className="error">{error}</p>
        ) : loading ? (
          <div className="loading-spinner"></div>
        ) : data?.totalItems ? (
          <>
            <DataListTable data={data?.data || []} />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={setItemsPerPage}
            />
          </>
        ) : (
          <p>No results were found</p>
        )}
      </div>
    </div>
  );
}

export default PaginatedTableContainer;
