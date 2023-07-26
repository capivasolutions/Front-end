import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { useParams } from "react-router-dom";

const TransactionDetails = () => {

  const { transactionId } = useParams();
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        id da transação que vou conectar depois: {transactionId}
        <PieChart />
      </Box>
    </Box>
  );
};

export default TransactionDetails;