import React from "react";
import { CircularProgress } from "@mui/material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { StartDateSelector } from "../../components/StartDateSelector";
import {
  mockBarV4,
  mockBarV10,
  mockBarV14,
  mockBarV12,
  mockBarV11,
  mockBarV17,
  mockBarV16,
  mockBarV9,
  mockBarV18,
} from "../../data/mockAnalyze";
import { useParams } from "react-router-dom";
import { useFetchTransaction } from "../../api/fetchTransaction";
import { ParallelChart } from "../../components/ParallelChart";

// PRINCIPAL
const TransactionDetails = () => {
  const { transactionId } = useParams();
  const { data, loading, error } = useFetchTransaction({
    id: transactionId,
    limit: 150,
  });

  //////////////////////////////////////
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getColor = () => {
    if (data?.transaction?.classification === 'GENUINE') return colors.greenAccent[300];
    return colors.blueAccent[300];
  }

  if (loading) {
    return (
      <Box m="20px">
        <Header />
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
        <Header title="Erro" subtitle="Sinto Muito" />
        <Box height="75vh">Ops, transação não encontrada!</Box>
        {/* TODO: construir tela de erro */}
      </Box>
    );
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Análise de Transações" />
        <Box
          gap={2}
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <StartDateSelector />
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="600"
                marginBottom={1}
                color={colors.grey[100]}
              >
                Comparação de Parâmetros
              </Typography>
              <Typography variant="p" fontWeight="400" color={colors.grey[100]}>
                No gráfico abaixo é comparado uma transação fraudulenta/legítima
                com outras 100 transações mais recentes da classe oposta.
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {<ParallelChart data={[data?.transaction, ...data.comparable]} />}
          </Box>
        </Box>
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V17 x V17
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV17,
                { category: "Transação", value: data?.transaction?.v17 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V14 x V14
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV14,
                { category: "Transação", value: data?.transaction?.v14 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V12 x V12
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV12,
                { category: "Transação", value: data?.transaction?.v12 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V10 x V10
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV10,
                { category: "Transação", value: data?.transaction?.v10 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V16 x V16
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV16,
                { category: "Transação", value: data?.transaction?.v16 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V11 x V11
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV11,
                { category: "Transação", value: data?.transaction?.v11 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V9 x V9
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV9,
                { category: "Transação", value: data?.transaction?.v9 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V4 x V4
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV4,
                { category: "Transação", value: data?.transaction?.v4 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            V18 x V18
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart
              isDashboard={true}
              data={[
                ...mockBarV18,
                { category: "Transação", value: data?.transaction?.v18 },
              ]}
              color={getColor()}
            />
          </Box>
        </Box>

        {/* Final */}
      </Box>
    </Box>
  );
};

export default TransactionDetails;
