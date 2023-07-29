import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SimpleMenu = () => {

  return (
    <Box width="100%" maxWidth="150px">
      <FormControl fullWidth>
        <InputLabel id="parameters-select-label">
          Todos
        </InputLabel>
        <Select
          id="start-date-select"
        //   value={startDateOption}
          label="Parametros"
          labelId="parameters-select-label"
          variant="outlined"
        >   
            <MenuItem>Amount</MenuItem>
            <MenuItem>Time  </MenuItem>
            <MenuItem>v1    </MenuItem>
            <MenuItem>v2    </MenuItem>
            <MenuItem>v3    </MenuItem>
            <MenuItem>v4    </MenuItem>
            <MenuItem>v5    </MenuItem>
            <MenuItem>v6    </MenuItem>
            <MenuItem>v7    </MenuItem>
            <MenuItem>v8    </MenuItem>
            <MenuItem>v9    </MenuItem>
            <MenuItem>v10   </MenuItem>
            <MenuItem>v11   </MenuItem>
            <MenuItem>v12   </MenuItem>
            <MenuItem>v13   </MenuItem>
            <MenuItem>v14   </MenuItem>
            <MenuItem>v15   </MenuItem>
            <MenuItem>v16   </MenuItem>
            <MenuItem>v17   </MenuItem>
            <MenuItem>v18   </MenuItem>
            <MenuItem>v19   </MenuItem>
            <MenuItem>v20   </MenuItem>
            <MenuItem>v21   </MenuItem>
            <MenuItem>v22   </MenuItem>
            <MenuItem>v23   </MenuItem>
            <MenuItem>v24   </MenuItem>
            <MenuItem>v25   </MenuItem>
            <MenuItem>v26   </MenuItem>
            <MenuItem>v27   </MenuItem>
            <MenuItem>v28   </MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
};

export default SimpleMenu;