import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataListTable from "../DataListTable";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { Data } from "../config";

const mockData: Data[] = [
  {
    id: 1,
    status: "Completed",
    name: "John Doe",
    description: "Test 1",
    delta: 10,
    createdOn: new Date("2022-01-01"),
  },
  {
    id: 2,
    status: "Error",
    name: "Jane Doe",
    description: "Test 2",
    delta: 20,
    createdOn: new Date("2022-01-02"),
  },
];

describe("DataListTable", () => {
  it("renders correctly with given props", () => {
    const { getByText } = render(<DataListTable data={mockData} />);

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
  });

  it("sorts data correctly when sorting is triggered", () => {
    const { container } = render(<DataListTable data={mockData} />);

    const sortButton = container.querySelector(".table-header-sort-button");
    if (sortButton) {
      fireEvent.click(sortButton);

      const rows = container.querySelectorAll("tbody tr");
      expect(rows[0]).toHaveTextContent("Jane Doe");
      expect(rows[1]).toHaveTextContent("John Doe");
    }
  });
});
