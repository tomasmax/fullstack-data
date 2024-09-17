import React from "react";
import { SortField, SortOrder } from "../DataListTable";

interface TableHeaderProps {
  onSort: (field: SortField) => void;
  sortField: SortField;
  sortOrder: SortOrder;
}

const TableHeader = ({ onSort, sortField, sortOrder }: TableHeaderProps) => (
  <thead>
    <tr>
      <th
        onClick={() => onSort("id")}
        className={sortField === "id" ? `sorted-${sortOrder}` : ""}
      >
        Id
      </th>
      <th
        onClick={() => onSort("name")}
        className={sortField === "name" ? `sorted-${sortOrder}` : ""}
      >
        Name
      </th>
      <th>Status</th>
      <th>Description</th>
      <th>Delta</th>
      <th
        onClick={() => onSort("createdOn")}
        className={sortField === "createdOn" ? `sorted-${sortOrder}` : ""}
      >
        Created On
      </th>
    </tr>
  </thead>
);

export default TableHeader;
