import React from "react";
import { Box, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useFetchTransaction } from "../../api/fetchTransaction";
import { ParallelChart } from "../../components/ParallelChart";

export default function TransactionDetails() {
  const { transactionId } = useParams();
  const { data, loading, error } = useFetchTransaction({
    id: transactionId,
    limit: 150,
  });

  console.log("error", loading);

  if (loading) {
    return (
      <Box m="20px">
        <Header title="Pie Chart" subtitle="Simple Pie Chart" />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="75vh"
        >
          <CircularProgress color="secondary" />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box m="20px">
        <Header title="Pie Chart" subtitle="Simple Pie Chart" />
        <Box height="75vh">Ops, transação não encontrada!</Box>
        {/* TODO: construir tela de erro */}
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="60vh">
        {<ParallelChart data={[data?.transaction, ...data.comparable]} />}
      </Box>
    </Box>
  );
}
