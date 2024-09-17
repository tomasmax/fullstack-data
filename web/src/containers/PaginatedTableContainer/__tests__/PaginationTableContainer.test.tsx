import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaginatedTableContainer from "../PaginatedTableContainer";
import "@testing-library/jest-dom";

// Mock axios
vi.mock("axios");

describe("PaginatedTableContainer", () => {
  const mockData = {
    data: {
      data: [{ id: 1, name: "John Doe", status: "COMPLETED" }],
      totalItems: 1,
      totalPages: 1,
      currentPage: 1,
    },
  };

  beforeEach(() => {
    // Mock axios.get
    vi.mocked(axios.get).mockResolvedValue(mockData);
  });

  it("renders correctly", async () => {
    render(<PaginatedTableContainer />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );
  });

  it("fetches data on mount", async () => {
    render(<PaginatedTableContainer />);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/data", {
      params: { page: 1, limit: 20 },
    });
  });

  it("handles status filter change", async () => {
    render(<PaginatedTableContainer />);
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByLabelText("Status Filter:"), {
      target: { value: "COMPLETED" },
    });
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/data", {
        params: expect.objectContaining({
          limit: 20,
          page: 1,
          status: "COMPLETED",
        }),
      })
    );
  });

  it("handles name filter change", async () => {
    render(<PaginatedTableContainer />);
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByPlaceholderText("Type search keyword"), {
      target: { value: "Jane" },
    });
    await waitFor(() =>
      expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/data", {
        params: expect.objectContaining({
          limit: 20,
          page: 1,
          search: "Jane",
        }),
      })
    );
  });

  it("displays error message on fetch failure", async () => {
    vi.mocked(axios.get).mockResolvedValue(new Error("Failed to fetch data"));
    render(<PaginatedTableContainer />);
    await waitFor(() =>
      expect(
        screen.getByText("Failed to fetch data. Please try again.")
      ).toBeInTheDocument()
    );
  });

  describe("Pagination", () => {
    const mockDataPages = {
      data: {
        data: [
          { id: 1, name: "John Doe", status: "COMPLETED" },
          { id: 1, name: "John Doe 2", status: "COMPLETED" },
        ],
        totalItems: 2,
        totalPages: 2,
        currentPage: 1,
      },
    };
    beforeEach(() => {
      // Mock axios.get
      vi.mocked(axios.get).mockResolvedValue(mockDataPages);
    });

    it("handles page change", async () => {
      render(<PaginatedTableContainer />);
      await waitFor(() =>
        expect(screen.getByText("John Doe")).toBeInTheDocument()
      );

      fireEvent.click(screen.getByText("Next Page"));
      await waitFor(() =>
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/data", {
          params: expect.objectContaining({
            limit: 20,
            page: 2,
          }),
        })
      );
    });
  });
});
