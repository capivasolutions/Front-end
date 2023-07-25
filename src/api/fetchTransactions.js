import { useCallback, useEffect } from "react";
import { useFetch } from "use-http";
import { BACKEND_URL } from "../config/environment";

export function useFetchTransactions({ startDate, interval }) {
  const { get, data = [], loading, error } = useFetch(BACKEND_URL, { cacheLife: 0, cachePolicy: 'no-cache', loading: true });

  const fetchTransactions = useCallback(async () => {
    console.log(new Date(startDate).toJSON())
    await get(`/transactions?start_date=${new Date(startDate).toJSON()}`);
  }, []);

  useEffect(() => {
    let subscription = null;

    if (interval) {
      subscription = setInterval(() => fetchTransactions(), interval);
    } else {
      fetchTransactions();
    }

    return () => clearInterval(subscription);
  }, []);

  return { data, loading, error };
}
