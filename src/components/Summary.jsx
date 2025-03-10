import { Card, CardContent, Typography, Grid } from "@mui/material";

const Summary = ({ totalIncome, totalExpense, netBalance }) => {
  return (
    <Grid container spacing={2} mb={2}>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4" color="green">
              ₹{totalIncome || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Expense</Typography>
            <Typography variant="h4" color="red">
              ₹{totalExpense || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Net Balance</Typography>
            <Typography variant="h4" color={netBalance >= 0 ? "green" : "red"}>
              ₹{netBalance || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Summary;
