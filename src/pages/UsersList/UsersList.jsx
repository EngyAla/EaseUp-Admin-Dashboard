import { Box, Typography, Pagination, Select, MenuItem, Grid } from "@mui/material";
import { DataGrid, useGridApiContext, useGridSelector, gridPageSelector, gridPageCountSelector, gridPaginationModelSelector } from "@mui/x-data-grid";
import { columns, row } from "./data";
import Cards from "../../components/Cards";
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useState } from "react";


const cardsData = [
    {
        title: "Total Users",
        description: "Overall registered participants",
        mainNumber: "1,248",
        subNumber: "+12.5%",
        icon: <PersonIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#00796B",
        subColor: "#E0F2F1",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Active Users",
        description: "Active in the last 24 hours",
        mainNumber: "856",
        subNumber: "+8%",
        icon: <BoltIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#2563EB",
        subColor: "#E3F2FD",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Active Crisis Alerts",
        description: "Requires immediate attention",
        mainNumber: "3",
        // subNumber: "+8%",
        icon: <ReportProblemIcon sx={{fontSize: 22}} />,
        colors: {
        mainColor: "#C62828",
        subColor: "#FCEBEB",
        mainTxtColor: "#D15353",
        subTxtColor: "#DD7E7E",
        mainNumColor: "#C62828",
        cardBgColor: "#FDF2F2"
        }
    }
];

function CustomFooter() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const paginationModel = useGridSelector(apiRef, gridPaginationModelSelector);
    // eslint-disable-next-line react-hooks/refs
    const rowCount = apiRef.current.getRowsCount();
    const start = paginationModel.page * paginationModel.pageSize + 1;
    const end = Math.min(start + paginationModel.pageSize - 1, rowCount);
    return (
        <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 2,
        py: 1,
        color: "white",
        borderTop: "1px solid #dedede",
        bgcolor: "#F8FAFC"
        }}>
        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
            Showing <b>{start}</b> to <b>{end}</b> of <b>{rowCount}</b> results
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>Per page</Typography>
            <Select
            value={paginationModel.pageSize}
            onChange={(e) => apiRef.current.setPageSize(Number(e.target.value))}
            size="small"
            sx={{ 
                px: 1,
                color: "#9ca3af", 
                border: "1px solid #dedede", 
                ".MuiOutlinedInput-notchedOutline": { border: 0 },
            }}
            >
            {[5, 10, 20].map((size) => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
            ))}
            </Select>
        </Box>

        <Pagination
            count={pageCount}
            page={page + 1}
            onChange={(event, value) => apiRef.current.setPage(value - 1)}
            variant="outlined"
            shape="rounded"
            sx={{
            "& .MuiPaginationItem-root": {
                color: "#9ca3af",
                "&.Mui-selected": {
                backgroundColor: "#00796B",
                color: "#ffffff",
                }
            }
            }}
        />
        </Box>
    );
}

const UsersList = () => {
    const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 5,});

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden", width: "99.5%" }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                {cardsData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Cards data={card} />
                    </Grid>
                ))}
            </Grid>
            <Box>
                <DataGrid 
                rows={row} 
                columns={columns}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
                showToolbar
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                    paginationModel: { pageSize: 5 }
                    }
                }}
                slots={{
                    footer: CustomFooter
                }}
                disableColumnMenu
                disableRowSelectionOnClick />
            </Box>
        </Box>
    )
}

export default UsersList;