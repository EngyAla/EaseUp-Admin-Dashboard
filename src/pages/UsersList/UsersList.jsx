import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { columns, row } from "./UsersListData";
import Cards from "../../components/Cards";
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CustomFooter from "../../components/CustomFooter";


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


const UsersList = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                {cardsData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Cards data={card} />
                    </Grid>
                ))}
            </Grid>
            <Box>
                <DataGrid sx={{ mb: 4 }}
                rows={row}
                columns={columns}
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