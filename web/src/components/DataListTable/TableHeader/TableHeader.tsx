import React from "react";
import {
  Header,
  DEFAULT_HEADERS,
  SORT_ORDER,
  SortField,
  SortOrder,
} from "../config";

interface TableHeaderProps {
  headers: Header[];
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
          sortField === field && sortOrder === SORT_ORDER.ASC ? "active" : ""
        }`}
      >
        ▲
      </span>
      <span
        className={`arrow ${
          sortField === field && sortOrder === SORT_ORDER.DESC ? "active" : ""
        }`}
      >
        ▼
      </span>
    </span>
  );
};

const TableHeader = ({
  headers = DEFAULT_HEADERS,
  onSort,
  sortField,
  sortOrder,
}: TableHeaderProps) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th key={header} onClick={() => onSort(header)}>
          <div className="th-header">
            {header}
            <SortArrows
              field={header}
              sortField={sortField}
              sortOrder={sortOrder}
            />
          </div>
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
