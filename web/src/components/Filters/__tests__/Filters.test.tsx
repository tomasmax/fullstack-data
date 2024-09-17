import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Filters from "../Filters";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Filters", () => {
  const mockOnStatusFilterChange = vi.fn();
  const mockOnNameFilterChange = vi.fn();

  const defaultProps = {
    nameFilter: "",
    statusFilter: "",
    onStatusFilterChange: mockOnStatusFilterChange,
    onNameFilterChange: mockOnNameFilterChange,
    totalItems: 0,
  };

  it("renders correctly with given props", () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <Filters {...defaultProps} />
    );

    expect(getByLabelText("Filter by name:")).toBeInTheDocument();
    expect(getByPlaceholderText("Type search keyword")).toBeInTheDocument();
    expect(getByLabelText("Status Filter:")).toBeInTheDocument();
  });

  it("calls onNameFilterChange when name filter input changes", () => {
    const { getByPlaceholderText } = render(<Filters {...defaultProps} />);
    const nameInput = getByPlaceholderText("Type search keyword");

    fireEvent.change(nameInput, { target: { value: "John" } });
    expect(mockOnNameFilterChange).toHaveBeenCalledWith("John");
  });

  it("calls onStatusFilterChange when status filter select changes", () => {
    const { getByLabelText } = render(<Filters {...defaultProps} />);
    const statusSelect = getByLabelText("Status Filter:");

    fireEvent.change(statusSelect, { target: { value: "COMPLETED" } });
    expect(mockOnStatusFilterChange).toHaveBeenCalledWith("COMPLETED");
  });

  it("displays total items correctly", () => {
    const { getByText } = render(<Filters {...defaultProps} totalItems={5} />);

    expect(getByText("Total Items: 5")).toBeInTheDocument();
  });
});
