import React, { useCallback, useEffect, useState } from "react";
import DataListTable, {
  Data,
} from "../../components/DataListTable/DataListTable";
import axios from "axios";
import Pagination from "../../components/Pagination/Pagination";
import { useDebounce } from "use-debounce";
import Filters from "../../components/Filters/Filters";

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

  const fetchData = useCallback(
    async (page: number, status: string, name: string, limit: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:3000/data", {
          params: {
            ...(status && { status }),
            ...(name && { search: name }),
            ...(limit && { limit }),
            page,
          },
        });
        setData(response.data.data);
        setTotalItems(response.data.totalItems);
        setTotalPages(response.data.totalPages);
        setCurrentPage(response.data.currentPage);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const [debouncedNameFilter] = useDebounce(nameFilter, INPUT_DEBOUNCE_TIME);

  useEffect(() => {
    fetchData(currentPage, statusFilter, debouncedNameFilter, itemsPerPage);
  }, [currentPage, statusFilter, debouncedNameFilter, fetchData, itemsPerPage]);

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
