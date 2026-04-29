// @ts-nocheck
import { Avatar, Box, Grid, Typography } from "@mui/material";
// import { columns, rows } from "./UsersListData";
import Cards from "../../components/Cards";
import CustomDataGrid from "../../components/MyDataGrid";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import { useContext, useMemo } from "react";
import { OverviewContext } from "../../Context/Overview/OverviewContext";
import { UsersListContext } from "../../Context/UsersList/UsersListContext";
import { Link } from "react-router";



const UsersList = () => {
    const { overviewData } = useContext(OverviewContext);
    const { usersListData, loading } = useContext(UsersListContext);

    const cardsData = useMemo(() => [
        {
            title: "Total Users",
            // description: "Overall registered participants",
            mainNumber: overviewData.users,
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
            mainNumber: overviewData.activeUsers,
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
            mainNumber: <Box> {overviewData.crisisUsers} <span style={{ fontSize: "12px", fontWeight: 500}}>Requires Attention</span></Box>,
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
    ], [overviewData])

    const rows = useMemo(() => {
        return usersListData?.map((user) => ({
            id: user.id,
            userDetails: user.name,
            email: user.email,
            status: user.status,
            lastActive: user.lastActive,
            imageUrl: user.imageUrl
        }));
    }, [usersListData]);
    
    const columns = useMemo(() =>[
    { 
        field: "id",
        headerName: "ID",
        width: 70 ,
        minWidth: 70
    },

    {
        field: "userDetails",
        headerName: "User Details",
        flex: 1.5,
        minWidth: 170,
        renderCell: (params) => {
        const imageUrl = params.row.imageUrl || ""; 
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, lineHeight: "normal", py: 1 }}>
            <Avatar
                // component="img"
                src={imageUrl}
                alt={params.value}
                sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #e0e0e0"
                }}
            />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {params.value}
            </Typography>
            </Box>
        );
        }
    },

    {
        field: "email",
        headerName: "Email Address",
        flex: 1.5,
        minWidth: 200,
        renderCell: (params) =>{
        return(
            <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, display: "inline-flex" }}>
                {params.value}
            </Typography>
        )
        }
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 220,
        renderCell: (params) => {
        const status = params.value;
        const statuStyle = {
            Excellent: {bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0", dot: "#22C55E"},
            Moderate: {bg: "#FEF3C7", color: "#B45309", border: "#FDE68A", dot:"#F59E0B"},
            Critical: {bg: "#FEE2E2", color: "#B91C1C", border: "#FECACA", dot: "#EF4444"}
        }
        const style = statuStyle[status] || {
                bg: "#E2E8F0",
                color: "#475569",
                border: "#CBD5E1",
                dot: "#94A3B8"
            };
        return (
            <Box
            sx={{
            backgroundColor: style.bg, 
            color: style.color,
            px: 3,           
            py: .7, 
            border: `1px solid ${style.border}`,      
            borderRadius: 50,
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            lineHeight: "normal",
            fontWeight: 500,
            width: 100,
            position: "relative",
            "&::before": {
                position: "absolute",
                content: "''",
                width: 6,
                height: 6,
                borderRadius: "50%",
                top: "50%",
                left: "10%",
                transform: "translateY(-50%)",
                backgroundColor: style.dot,
            }
            }}
        >
            <Box></Box>
            {params.value}
        </Box>
        );
    }
    },

    {
        field: "lastActive",
        headerName: "Last Active",
        flex: 1,
        minWidth: 170,
        renderCell: (params) =>{
        return(
            <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, display: "inline-flex" }}>
                {params.value == false ? "Yesterday, 4:22 PM" : params.value}
            </Typography>
        )
        }
    },

    {
        field: "action",
        headerName: "Actions",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
        return (
        <Link to={`/dashboard/studentProfile/${params.row.id}`} style={{ textDecoration: "none" }}>
            <Box
            sx={{
                backgroundColor: "#00796B", 
                px: 3.5,           
                py: .9, 
                borderRadius: 1,
                display: "inline-flex",
                alignItems: "center",
                lineHeight: "normal",
                fontWeight: 500,
                color: "#ffffff",
            }}
            >
            View
            </Box>
        </Link>
        );
    }
    },
    ], []);

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
                {loading ? (
                    <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, textAlign: "center"}}>Loading...</Typography>
                ): (
                    <CustomDataGrid rows={rows} columns={columns}/>
                )
                }
            </Box>
        </Box>
    )
}

export default UsersList;