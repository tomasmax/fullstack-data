import React from "react";
import { SORT_ORDER, SortField, SortOrder } from "../config";

interface TableHeaderProps {
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortOrder: SortOrder;
}

type SortArrowsProps = Pick<TableHeaderProps, "sortField" | "sortOrder"> & {
  field: SortField;
};

const SortArrows = ({ field, sortField, sortOrder }: SortArrowsProps) => {
  return (
    <span className="sort-arrows">
      <span
        className={`arrow ${
          sortField === field && sortOrder === SORT_ORDER.ASC ? "COMPLETED" : ""
        }`}
      >
        ▲
      </span>
      <span
        className={`arrow ${
          sortField === field && sortOrder === SORT_ORDER.DESC
            ? "COMPLETED"
            : ""
        }`}
      >
        ▼
      </span>
    </span>
  );
};

const TableHeader = ({ onSort, sortField, sortOrder }: TableHeaderProps) => (
  <thead>
    <tr>
      <th onClick={() => onSort("id")}>
        <div className="th-header">
          ID
          <SortArrows field="id" sortField={sortField} sortOrder={sortOrder} />
        </div>
      </th>
      <th onClick={() => onSort("name")}>
        <div className="th-header">
          Name
          <SortArrows
            field="name"
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>
      </th>
      <th>Status</th>
      <th>Description</th>
      <th>Delta</th>
      <th onClick={() => onSort("createdOn")}>
        <div className="th-header">
          Created On
          <SortArrows
            field="createdOn"
            sortField={sortField}
            sortOrder={sortOrder}
          />
        </div>
      </th>
    </tr>
  </thead>
);

export default TableHeader;
