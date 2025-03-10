import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/transactions"; // Adjust if needed

export const useTransactions = (filters) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (filters?.category) params.append("category", filters.category);
        if (filters?.type) params.append("type", filters.type);
        if (filters?.startDate) params.append("startDate", filters.startDate);
        if (filters?.endDate) params.append("endDate", filters.endDate);

        const queryString = params.toString() ? `?${params.toString()}` : "";

        const { data } = await axios.get(`${API_URL}${queryString}`);

        setTransactions(data.data || []);
        setSummary(
          data.summary || { totalIncome: 0, totalExpense: 0, netBalance: 0 }
        );
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setTransactions([]);
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    const delayFetch = setTimeout(fetchTransactions, 500); // Debounce API calls
    return () => clearTimeout(delayFetch);
  }, [filters]); // Fetch data when filters change

  return { transactions, summary, loading, error };
};
