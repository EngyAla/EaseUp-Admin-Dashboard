import { Box, Grid } from "@mui/material";
import { columns, rows } from "./UsersListData";
import Cards from "../../components/Cards";
import CustomDataGrid from "../../components/MyDataGrid";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';


const cardsData = [
    {
        title: "Total Users",
        // description: "Overall registered participants",
        mainNumber: "1,240",
        subNumber: "+5%",
        icon: <GroupsIcon sx={{ fontSize: 24 }} />,
        path: "/dashboard/usersList",
        colors: {
        mainColor: "#00796B",
        subColor: "#E0F2F1",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Active Today",
        // description: "Stable",
        mainNumber: "856",
        // subNumber: "+8%",
        icon: <InsightsIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#2563EB",
        subColor: "#E3F2FD",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Emergency Alerts",
        // description: "Requires Attention",
        mainNumber: <Box>12 <span style={{ fontSize: "12px", fontWeight: 500}}>Requires Attention</span></Box>,
        // subNumber: "+8%",
        icon: <ReportProblemIcon sx={{fontSize: 22}} />,
        path: "/dashboard/crisisLogs",
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
                <CustomDataGrid rows={rows} columns={columns}/>
            </Box>
        </Box>
    )
}

export default UsersList;