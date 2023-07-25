import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import PaymentsIcon from "@mui/icons-material/PaymentsOutlined";
import CancelIcon from "@mui/icons-material/CloseOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import { useFetchTransactions } from "../../api";
import { CurrencyUtils } from "../../utils/currency";
import { RecentTransactions } from "../recent-transactions";
import { StartDateSelector } from "../../components/StartDateSelector";
import { useStartDate } from "../../hooks/useStartDate";

const UPDATE_SCREEN_INTERVAL = 1000; // ms

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { startDate } = useStartDate();
  const { data } = useFetchTransactions({
    interval: UPDATE_SCREEN_INTERVAL,
    startDate,
  });

  const genuineCOlor = colors.greenAccent[500];
  const fraudulentColor = colors.redAccent[500];

  const fraudulentTransactions = data?.filter(
    (transaction) => transaction.classification === "FRAUDULENT"
  )?.length;

  const genuineTransactions = data?.filter(
    (transaction) => transaction.classification === "GENUINE"
  )?.length;

  const totalAmount = data?.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const formattedTotalAmount = CurrencyUtils.toBrazilianCurrency(totalAmount);

  const countTransactions = data?.length;

  /* Sum total os amount of genuines */
  const totalAmountGenuine = data
    ?.filter((transaction) => transaction.classification === "GENUINE")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const formattedTotalAmountGenuine =
    CurrencyUtils.toBrazilianCurrency(totalAmountGenuine);

  /* Sum total os amount of fraudulents */
  const totalAmountFraudulent = data
    ?.filter((transaction) => transaction.classification === "FRAUDULENT")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
  const formattedTotalAmountFraudulent = CurrencyUtils.toBrazilianCurrency(
    totalAmountFraudulent
  );

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Painel Administrativo" subtitle="Bem Vindo!" />
        <Box
          gap={2}
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-end"
        >
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
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countTransactions}
            subtitle="Número de transações"
            progress="0.75"
            increase="+14%"
            icon={
              <CreditCardIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={genuineTransactions}
            subtitle="Legítimos"
            progress="0.50"
            increase="+21%"
            icon={
              <DoneIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={fraudulentTransactions}
            subtitle="Fraudes"
            progress="0.30"
            increase="+5%"
            icon={
              <CancelIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formattedTotalAmount}
            subtitle="Valor total de transações"
            progress="0.80"
            increase="+43%"
            icon={
              <PaymentsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
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
                color={colors.grey[100]}
              >
                Comparando valor de transações
              </Typography>
              {/* Genuinas */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color={colors.blueAccent[300]}
              >
                Valor total de fraudes: {formattedTotalAmountFraudulent}
              </Typography>
              {/* Fraudes */}
              <Typography
                variant="h6"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Valor total de legítimos: {formattedTotalAmountGenuine}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart data={data} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <RecentTransactions transactions={data} />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Comparativo de Fraudes e legitimos
          </Typography>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart data={data} isDashboard={true} />
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
            Top 6 Parametros mais importantes
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
