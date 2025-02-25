import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import axiosInstance from "../api/axiosInstance";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

const useFetch = <T,>(
  url: string,
  method: HttpMethod = "GET",
  options?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response: AxiosResponse<T> = await axiosInstance({
          url,
          method,
          ...options,
          signal,
        });
        if (!response.data) {
          throw new Error("Empty data");
        }
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled: ", err.message);
        } else {
          setError("Failed to fetch data. Please try again.");
          console.error("Request error: ", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, method, options]);

  return { data, loading, error };
};

export default useFetch;
