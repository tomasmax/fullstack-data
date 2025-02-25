import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import axiosInstance from "../../api/axiosInstance";
import useFetch from "../useFetch";

// Mock axiosInstance
vi.mock("../../api/axiosInstance");

describe("useFetch", () => {
  const mockData = { data: { id: 1, name: "John Doe" } };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    vi.mocked(axiosInstance).mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useFetch("/data"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });
  });

  it("handles fetch error", async () => {
    vi.mocked(axiosInstance).mockRejectedValueOnce(
      new Error("Failed to fetch data")
    );

    const { result } = renderHook(() => useFetch("/data"));

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toBe(
        "Failed to fetch data. Please try again."
      );
    });
  });

  it("cancels fetch on unmount", async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, "abort");

    vi.mocked(axiosInstance).mockImplementationOnce(() =>
      Promise.resolve({ data: mockData })
    );

    const { result, unmount } = renderHook(() => useFetch("/data"));

    expect(result.current.loading).toBe(true);

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });

  it("updates data when options change", async () => {
    const newMockData = { data: { id: 2, name: "Jane Doe" } };
    vi.mocked(axiosInstance).mockResolvedValueOnce({ data: mockData });
    vi.mocked(axiosInstance).mockResolvedValueOnce({ data: newMockData });

    const { result, rerender } = renderHook(
      ({ options }) => useFetch("/data", "GET", options),
      {
        initialProps: { options: { params: { id: 1 } } },
      }
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(mockData);
      expect(result.current.error).toBe(null);
    });

    rerender({ options: { params: { id: 2 } } });

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(newMockData);
      expect(result.current.error).toBe(null);
    });
  });
});
