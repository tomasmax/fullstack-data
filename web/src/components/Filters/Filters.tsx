import React, { useCallback } from "react";
import "./Filters.css";

const BASE_CLASS = "filters";

interface FiltersProps {
  nameFilter: string;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onNameFilterChange: (name: string) => void;
  totalItems: number;
}

const Filters = ({
  nameFilter,
  statusFilter,
  onStatusFilterChange,
  onNameFilterChange,
  totalItems,
}: FiltersProps) => {
  const handleStatusFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onStatusFilterChange(event.target.value);
  };

  const handleNameFilterChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onNameFilterChange(event.target.value);
    },
    [onNameFilterChange]
  );

  return (
    <section className={`${BASE_CLASS}`}>
      <div className={`${BASE_CLASS}-top`}>
        <div className={`${BASE_CLASS}-filter`}>
          <label htmlFor="nameFilter">Filter by name:</label>
          <input
            id="nameFilter"
            value={nameFilter}
            type="text"
            placeholder="Type search keyword"
            onChange={(e) => handleNameFilterChange(e)}
          />
        </div>
        <div className={`${BASE_CLASS}-filter`}>
          <label htmlFor="statusFilter">Status Filter:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={handleStatusFilterChange}
          >
            <option value=""></option>
            <option value="COMPLETED">Completed</option>
            <option value="ERROR">Error</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>
      </div>
      {totalItems && (
        <p className={`${BASE_CLASS}-total`}>Total Items: {totalItems}</p>
      )}
    </section>
  );
};

export default Filters;
