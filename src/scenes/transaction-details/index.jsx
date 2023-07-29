
import React from "react";
import {CircularProgress } from "@mui/material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { StartDateSelector } from "../../components/StartDateSelector";
import { mockBarV4
        ,mockBar26
        ,mockBarV10
        ,mockBarTime
        ,mockBarV14
        ,mockBarV12
        ,mockBarV11
        ,mockBarV19
        ,mockBarAmount
      } from "../../data/mockAnalyze";
import { useParams } from "react-router-dom";
import { useFetchTransaction } from "../../api/fetchTransaction";
import { ParallelChart } from "../../components/ParallelChart";
import SimpleMenu from "../../components/NavigateParameters";

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
  // const { startDate } = useStartDate();

  console.log("error", loading);

  if (loading) {
    return (
      <Box m="20px">
        <Header/>
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
          <SimpleMenu/>
          <StartDateSelector />
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "14px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
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
              <Typography
                  variant="p"
                  fontWeight="400"
                  color={colors.grey[100]}
              >
                No gráfico abaixo é comparado uma transação fraudulenta/legítima com outras 100 transações mais recentes da classe oposta.
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
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
            V4 x V4
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart isDashboard={true} data={mockBarV4} />
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
            V26 x V26
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart isDashboard={true} data={mockBar26} />
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
            <BarChart isDashboard={true} data={mockBarV10} />
          </Box>
        </Box>

        {/* ROW 2 */}
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
            Time x Time
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart isDashboard={true} data={mockBarTime} />
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
            <BarChart isDashboard={true} data={mockBarV14} />
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
            <BarChart isDashboard={true} data={mockBarV12} />
          </Box>
        </Box>
        
        {/* ROW 3 */}
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
            <BarChart isDashboard={true} data={mockBarV11} />
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
            V19 x V19
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart isDashboard={true} data={mockBarV19} />
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
            Amount x Amount
          </Typography>
          <Box height="90%" mt="-25px" ml="5px" mr="-80px">
            <BarChart isDashboard={true} data={mockBarAmount} />
          </Box>
        </Box>
        {/* Final */}
      </Box>
    </Box>
  );
};

export default TransactionDetails;