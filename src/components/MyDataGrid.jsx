import { ThemeProvider } from "@mui/material";
import CustomFooter from "./CustomFooter";
import { DataGrid } from "@mui/x-data-grid";
import { dashboardTheme } from '../createTheme'

const MyDataGrid = ({ rows, columns}) => {
    return (
        <ThemeProvider theme={dashboardTheme}>
            <DataGrid
                sx={{ mb: 2, }}
                rows={rows}
                columns={columns}
                showToolbar
                pageSizeOptions={[5, 10, 20]}
                initialState={{
                    pagination: {
                    paginationModel: { pageSize: 5 },
                    },
                }}
                slots={{
                    footer: CustomFooter,
                }}
                // disableColumnMenu
                // disableRowSelectionOnClick
            />
        </ThemeProvider>
    );
};

export default MyDataGrid;