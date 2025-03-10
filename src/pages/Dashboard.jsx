import { useState } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { useCategories } from "../hooks/useCategories";
import {
  Container,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Summary from "../components/Summary";

const Dashboard = () => {
  // State for filters
  const [filters, setFilters] = useState({
    category: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const { transactions, summary, loading, error } = useTransactions(filters);
  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useCategories();

  if (loading || categoryLoading) return <CircularProgress />;

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Unknown";
  };

  // Columns for DataGrid Table
  const columns = [
    { field: "type", headerName: "Type", flex: 1 },
    { field: "amount", headerName: "Amount (₹)", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params) => getCategoryName(params.value),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
  ];

  // Reset all filters
  const handleResetFilters = () => {
    setFilters({
      category: "",
      type: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <Container style={{ marginTop: "5%" }}>
      <Typography variant="h4" gutterBottom>
        Transaction Dashboard
      </Typography>
      {/* Summary Component */}
      <Summary
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
        netBalance={summary.netBalance}
      />

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {/* Category Filter */}
        <FormControl sx={{ width: "30%" }}>
          <InputLabel>Select Category</InputLabel>
          <Select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <MenuItem value="">All</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Type Filter */}
        <FormControl sx={{ width: "30%" }}>
          <InputLabel>Select Type</InputLabel>
          <Select
            value={filters.type}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="INCOME">Income</MenuItem>
            <MenuItem value="EXPENSE">Expense</MenuItem>
          </Select>
        </FormControl>

        {/* Date Filters */}
        <TextField
          type="date"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={filters.startDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, startDate: e.target.value }))
          }
        />
        <TextField
          type="date"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={filters.endDate}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, endDate: e.target.value }))
          }
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>

      {/* Transactions Table */}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </div>
    </Container>
  );
};

export default Dashboard;
