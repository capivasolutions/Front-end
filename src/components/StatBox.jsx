import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const StatBox = ({ title, subtitle, icon, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const textColor = color ?? colors.grey[100];

  return (
    <Box width="100%" m="0 30px" textAlign="center">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap="8px">
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: textColor }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
