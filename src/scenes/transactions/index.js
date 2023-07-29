import {Box, Chip, Typography, useTheme} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import {useFetchTransactions} from "../../api";
import {useStartDate} from "../../hooks/useStartDate";
import {useNavigate} from "react-router-dom";
import {StartDateSelector} from "../../components/StartDateSelector";

const Transactions = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { startDate } = useStartDate();
    const { data, loading } = useFetchTransactions({ startDate });
    const navigate = useNavigate();

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "v17",
            headerName: "V17",
            type: "number",
            flex: 1,
        },
        {
            field: "v14",
            headerName: "V14",
            type: "number",
            flex: 1,
        },
        {
            field: "v12",
            headerName: "V12",
            type: "number",
            flex: 1,
        },
        {
            field: "v10",
            headerName: "V10",
            type: "number",
            flex: 1,
        },
        {
            field: "v16",
            headerName: "V16",
            type: "number",
            flex: 1,
        },
        {
            field: "v11",
            headerName: "V11",
            type: "number",
            flex: 1,
        },
        {
            field: "v9",
            headerName: "V9",
            type: "number",
            flex: 1,
        },
        {
            field: "v4",
            headerName: "V4",
            type: "number",
            flex: 1,
        },
        {
            field: "v18",
            headerName: "V18",
            type: "number",
            flex: 1,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            flex: 1,
        },
        {
            field: "time",
            headerName: "Time",
            type: "number",
            flex: 1,
        },
        {
            field: "classification",
            headerName: "Classe",
            flex: 1,
            renderCell: (params) => {
                if (params.value === 'GENUINE') return <Chip sx={{ background: colors.greenAccent[700] }} label="Legítimo"></Chip>;
                return <Chip sx={{ background: colors.blueAccent[700] }} label="Fraude"></Chip>;
            }
        },
    ];

    return (
        <Box m="20px">
            <Header title="Transações" subtitle="Lista de transações" />
            <StartDateSelector />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid loading={loading} rows={data} columns={columns} onCellClick={({ row }) => navigate(`/transaction-details/${row.id}`)} />
            </Box>
        </Box>
    );
};

export default Transactions;
