import {Box, Collapse, Typography, useTheme} from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { tokens } from "../../theme";
import { CurrencyUtils } from "../../utils/currency";
import { DateUtils } from "../../utils/date";

export function RecentTransactions({ transactions, onClickTransaction }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const sortedTransactions = transactions.map((transaction) => {
    const { id, created_at, amount, classification } = transaction;
    return { id, created_at, amount, classification };
  }).sort((a, b) =>
    new Date(b.created_at) - new Date(a.created_at)
  );

  const lastTransactions = sortedTransactions.splice(0, 100);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom={`4px solid ${colors.primary[500]}`}
        colors={colors.grey[100]}
        p="15px"
      >
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Transações recentes
        </Typography>
      </Box>
      <Box>
        <TransitionGroup>
          {
            lastTransactions.map((transaction, i) => (
              <Collapse key={transaction.id} onClick={() => onClickTransaction(transaction)}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                  sx={{ ':hover': { cursor: 'pointer', background: colors.primary[500] } }}
                >
                  <Box color={colors.grey[100]}>
                    <Typography>{transaction.classification === 'FRAUDULENT' ? 'Fraude' : 'Legítimo'}</Typography>
                    <Typography>{DateUtils.formatDateTime(transaction.created_at)}</Typography>
                  </Box>
                  <Box
                    backgroundColor={transaction.classification === 'FRAUDULENT' ? colors.blueAccent[600] : colors.greenAccent[600]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    <Typography
                      variant="h5"
                      fontWeight="600"
                    >
                      {CurrencyUtils.toBrazilianCurrency(transaction.amount)}
                    </Typography>
                  </Box>
                </Box>
              </Collapse>
            ))
          }
        </TransitionGroup>
      </Box>
    </>
  );
}
