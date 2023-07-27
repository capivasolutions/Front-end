import { useEffect } from "react";
import { useFetch } from "use-http";
import { BACKEND_URL } from "../config/environment";

export function useFetchTransaction({ id, limit }) {
  const { get, data, loading, error } = useFetch(BACKEND_URL, { loading: true });

  useEffect(() => {
    const fetchTransaction = async () => {
      await get(`/transactions/${id}?limit=${limit}`);
    };
    fetchTransaction();
  }, [get, id, limit]);

  return { data, loading, error };
}
