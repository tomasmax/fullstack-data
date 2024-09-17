import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();
  const mockOnItemsPerPageChange = vi.fn();

  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10,
    onPageChange: mockOnPageChange,
    onItemsPerPageChange: mockOnItemsPerPageChange,
  };

  it("renders correctly with given props", () => {
    const { getByText } = render(<Pagination {...defaultProps} />);

    expect(getByText("Previous page")).toBeInTheDocument();
    expect(getByText("Next Page")).toBeInTheDocument();
  });

  it("calls onPageChange when 'Previous page' button is clicked", () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    const prevButton = getByText("Previous page");

    fireEvent.click(prevButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange when 'Next Page' button is clicked", () => {
    const { getByText } = render(
      <Pagination {...defaultProps} currentPage={2} />
    );
    const nextButton = getByText("Next Page");

    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange when page select dropdown changes", () => {
    const { getByDisplayValue } = render(<Pagination {...defaultProps} />);
    const pageSelect = getByDisplayValue("1");

    fireEvent.change(pageSelect, { target: { value: "3" } });
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onItemsPerPageChange and onPageChange when items per page dropdown changes", () => {
    const { getByDisplayValue } = render(<Pagination {...defaultProps} />);
    const itemsPerPageSelect = getByDisplayValue("10");

    fireEvent.change(itemsPerPageSelect, { target: { value: "20" } });
    expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
