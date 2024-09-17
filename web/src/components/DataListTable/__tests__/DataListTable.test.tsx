import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DataListTable, { Data } from "../DataListTable";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

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
    const { getByText } = render(
      <DataListTable
        data={mockData}
        onStatusFilterChange={vi.fn()}
        onNameFilterChange={vi.fn()}
      />
    );

    expect(getByText("John Doe")).toBeInTheDocument();
    expect(getByText("Jane Doe")).toBeInTheDocument();
  });

  it("calls onStatusFilterChange when status filter is changed", () => {
    const onStatusFilterChange = vi.fn();
    const { getByLabelText } = render(
      <DataListTable
        data={mockData}
        onStatusFilterChange={onStatusFilterChange}
        onNameFilterChange={vi.fn()}
      />
    );

    fireEvent.change(getByLabelText("Status Filter:"), {
      target: { value: "COMPLETED" },
    });
    expect(onStatusFilterChange).toHaveBeenCalledWith("COMPLETED");
  });

  it("calls onNameFilterChange when name filter is changed", () => {
    const onNameFilterChange = vi.fn();
    const { getByPlaceholderText } = render(
      <DataListTable
        data={mockData}
        onStatusFilterChange={vi.fn()}
        onNameFilterChange={onNameFilterChange}
      />
    );

    fireEvent.change(getByPlaceholderText("Type search keyword"), {
      target: { value: "John" },
    });
    expect(onNameFilterChange).toHaveBeenCalledWith("John");
  });

  it("sorts data correctly when sorting is triggered", () => {
    const { container } = render(
      <DataListTable
        data={mockData}
        onStatusFilterChange={vi.fn()}
        onNameFilterChange={vi.fn()}
      />
    );

    const sortButton = container.querySelector(".table-header-sort-button");
    if (sortButton) {
      fireEvent.click(sortButton);

      const rows = container.querySelectorAll("tbody tr");
      expect(rows[0]).toHaveTextContent("Jane Doe");
      expect(rows[1]).toHaveTextContent("John Doe");
    }
  });
});
