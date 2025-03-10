import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch transactions"
    );
  }
};

export const fetchSummary = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/summary`);
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch summary");
  }
};
