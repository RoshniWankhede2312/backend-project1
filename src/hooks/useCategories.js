import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/category"; // Adjust if needed

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setCategories(response.data?.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch categories");
      }
      setLoading(false);
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
