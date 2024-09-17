import React from "react";
import { format } from "date-fns";
import { Data } from "../DataListTable";

const TableRow = ({
  id,
  name,
  status,
  description,
  delta,
  createdOn,
}: Data) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{status}</td>
    <td>{description}</td>
    <td>{delta}</td>
    <td>
      {createdOn ? format(new Date(createdOn), "yyyy-MM-dd HH:mm:ss") : ""}
    </td>
  </tr>
);

export default TableRow;
