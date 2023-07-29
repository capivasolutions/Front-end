import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCardOutlined";
import PaymentsIcon from "@mui/icons-material/PaymentsOutlined";
import CancelIcon from "@mui/icons-material/CloseOutlined";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import { useFetchTransactions } from "../../api";
import { CurrencyUtils } from "../../utils/currency";
import { RecentTransactions } from "../recent-transactions";
import { StartDateSelector } from "../../components/StartDateSelector";
import { useStartDate } from "../../hooks/useStartDate";
import { useNavigate } from "react-router-dom";
import { mockBarImportance} from "../../data/mockAnalyze";


const UPDATE_SCREEN_INTERVAL = 2000; // ms

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { startDate } = useStartDate();
  const { data } = useFetchTransactions({
    interval: UPDATE_SCREEN_INTERVAL,
    startDate,
  });

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

  const navigate = useNavigate();
  // Função para lidar com o redirecionamento quando uma transação é clicada
  const handleTransactionClick = (transaction) => {
    // Aqui, você pode usar os dados da transação para criar a URL com um filtro ou realizar qualquer outra ação desejada
    // Por exemplo, você pode usar o ID da transação para criar uma URL com um parâmetro de consulta:
    // window.location.href = `/detalhes-da-transacao?id=${transaction.id}`;

    // Neste exemplo, vamos supor que você esteja usando o React Router
    // E que a rota "/detalhes-da-transacao" esteja configurada para renderizar a página com os detalhes da transação
    navigate(`/transaction-details/${transaction.id}`);
  };

  return (
    <Box m="20px" pb="20px">
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
            icon={
              <CreditCardIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
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
            icon={
              <CancelIcon
                sx={{ color: colors.blueAccent[600], fontSize: "26px" }}
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
            icon={
              <PaymentsIcon
                sx={{ color: colors.grey[100], fontSize: "26px" }}
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
                variant="h5"
                fontWeight="600"
                marginBottom={1}
                color={colors.grey[100]}
              >
                Comparativo do valor de transações no decorrer do tempo
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
          <Box height="230px" m="-20px 0 0 0">
            <LineChart data={data} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <RecentTransactions
            transactions={data}
            onClickTransaction={handleTransactionClick}
          />
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Comparativo de Fraudes e legítimos
          </Typography>
          <Box height="250px" m="-20px 0 0 0">
            <PieChart data={data} isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            {mockBarImportance.length} Parâmetros mais importantes
          </Typography>
          <Box height="90%" mt="-25px">
            <BarChart isDashboard={true} data={mockBarImportance} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
