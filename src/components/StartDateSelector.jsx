import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { StartDateOptions, useStartDate } from "../hooks/useStartDate";

export function StartDateSelector() {
  const { startDateOption, onChangeStartDate } = useStartDate();

  const handleChange = (e) => {
    onChangeStartDate(e.target.value);
  };

  return (
    <Box width="100%" maxWidth="150px">
      <FormControl fullWidth>
        <InputLabel id="start-date-select-label">
          Data/Hora de início
        </InputLabel>
        <Select
          id="start-date-select"
          value={startDateOption}
          label="Data/Hora de início"
          labelId="start-date-select-label"
          variant="outlined"
          onChange={handleChange}
        >
          <MenuItem value={StartDateOptions.NOW}>Agora</MenuItem>
          <MenuItem value={StartDateOptions.ONE_HOUR_AGO}>
            1 hora atrás
          </MenuItem>
          <MenuItem value={StartDateOptions.ONE_DAY_AGO}>1 dia atrás</MenuItem>
          <MenuItem value={StartDateOptions.ONE_MONTH_AGO}>
            1 mês atrás
          </MenuItem>
          <MenuItem value={StartDateOptions.ONE_YEAR_AGO}>1 ano atrás</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
