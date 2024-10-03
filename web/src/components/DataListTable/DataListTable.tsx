import React, { useMemo, useState } from "react";
import "./DataListTable.css";
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";
import { SORT_ORDER, SortField, SortOrder } from "./config";
import type { Data } from "../../types/data";

interface DataListTableProps {
  data: Data[];
}
const BASE_CLASS = "dataListTable";

const DataListTable = ({ data }: DataListTableProps) => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SORT_ORDER.ASC);

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
