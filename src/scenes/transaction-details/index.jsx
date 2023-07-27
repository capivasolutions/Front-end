import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useParams } from "react-router-dom";
import { useFetchTransaction } from "../../api/fetchTransaction";

export default function TransactionDetails() {
  const { transactionId } = useParams();
  const { data } = useFetchTransaction({ id: transactionId });

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        id da transação que vou conectar depois: {transactionId}
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <PieChart />
      </Box>
    </Box>
  );
}
