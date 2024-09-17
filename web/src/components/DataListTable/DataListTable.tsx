import React, { useCallback, useMemo, useState } from "react";
import "./DataListTable.css";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

export interface Data {
  id: number;
  status: string;
  createdOn?: Date;
  name: string;
  description?: string;
  delta?: number | string;
}

interface Props {
  data: Data[];
  statusFilter: string;
  nameFilter: string;
  onStatusFilterChange: (status: string) => void;
  onNameFilterChange: (name: string) => void;
}
export type SortOrder = "asc" | "desc";
export type SortField = keyof Data | null;

const BASE_CLASS = "dataListTable";
const SORT_ORDER: { ASC: SortOrder; DESC: SortOrder } = {
  ASC: "asc",
  DESC: "desc",
};

const DataListTable = ({
  data,
  statusFilter,
  nameFilter,
  onStatusFilterChange,
  onNameFilterChange,
}: Props) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC);

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

  const handleSorting = (field: SortField) => {
    const order =
      sortField === field && sortOrder === SORT_ORDER.ASC
        ? SORT_ORDER.DESC
        : SORT_ORDER.ASC;
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) return sortOrder === SORT_ORDER.ASC ? -1 : 1;
      if (aValue > bValue) return sortOrder === SORT_ORDER.ASC ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortOrder]);

  return (
    <div className={BASE_CLASS}>
      <section className={`${BASE_CLASS}-filters`}>
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
      </section>

      <table className={`${BASE_CLASS}-table`}>
        <TableHeader
          onSort={handleSorting}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        <tbody>
          {sortedData.map(
            ({ id, name, status, description, delta, createdOn }) => (
              <TableRow
                key={id}
                id={id}
                name={name}
                status={status}
                description={description}
                delta={delta}
                createdOn={createdOn}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataListTable;
