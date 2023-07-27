import { useEffect } from "react";
import { useFetch } from "use-http";
import { BACKEND_URL } from "../config/environment";

export function useFetchTransaction({ id }) {
  const { get, data, loading, error } = useFetch(BACKEND_URL, { loading: true });

  useEffect(() => {
    const fetchTransaction = async () => {
      await get(`/transactions/${id}`);
    };
    fetchTransaction();
  }, [get, id]);

  return { data, loading, error };
}
