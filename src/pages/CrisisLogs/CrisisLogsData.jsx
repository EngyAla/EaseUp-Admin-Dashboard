import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

export const rows = [
    {
        id: 1,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "High",
        status: "New",
        action: "View",
    },
    {
        id: 2,
        triggerReason: "Negative Journal Entry",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Medium",
        status: "Reviewed",
        action: "Review",
    },
    {
        id: 3,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Medium",
        status: "New",
        action: "Review",
    },
    {
        id: 4,
        triggerReason: "Negative Journal Entry",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Low",
        status: "Escalated",
        action: "View",
    },
    {
        id: 5,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "High",
        status: "Escalated",
        action: "View",
    },
    {
        id: 6,
        triggerReason: "Negative Journal Entry",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Low",
        status: "New",
        action: "Review",
    },
    {
        id: 7,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "High",
        status: "Escalated",
        action: "View",
    },
    {
        id: 8,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Medium",
        status: "Reviewed",
        action: "View",
    },
    {
        id: 9,
        triggerReason: "Low Mood Score",
        dateTime: "Oct 24, 10:30 AM",
        riskLevel: "Low",
        status: "New",
        action: "Review",
    },
];




export const columns = [
    { 
        field: "id",
        headerName: "Student ID",
        width: 70 ,
        minWidth: 100
    },

    {
        field: "triggerReason",
        headerName: "Trigger Reason",
        flex: 1.5,
        minWidth: 170,
        renderCell: (params) =>{
        return(
            <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, display: "inline-flex" }}>
                {params.value}
            </Typography>
        )
        }
    },

    {
        field: "dateTime",
        headerName: "Date & Time",
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
        field: "riskLevel",
        headerName: "Risk Level",
        flex: 1,
        minWidth: 220,
        renderCell: (params) => {
        const status = params.value;
        const statuStyle = {
            High: {bg: "#FEE2E2", color: "#B91C1C", border: "#ffabab"},
            Medium: {bg: "#FFEDD5", color: "#C2410C", border: "#ffd9a8"},
            Low: {bg: "#FEF9C3", color: "#A16207", border: "#f8e467"}
        }
        const style = statuStyle[status];
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
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "normal",
            fontWeight: 500,
            width: 90,
            }}
        >
            {params.value}
        </Box>
        );
    }
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 170,
        renderCell: (params) => {
        const status = params.value;
        const statuStyle = {
            New: {bg: "#DBEAFE", color: "#1D4ED8", border: "#99c5fe"},
            Reviewed: {bg: "#eaeaea", color: "#4e5763", border: "#b7b7b7"},
            Escalated: {bg: "#F3E8FF", color: "#7E22CE", border: "#d3abff"}
        }
        const style = statuStyle[status];
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
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "normal",
            fontWeight: 500,
            width: 90,
            }}
        >
            {params.value}
        </Box>
        );
    }
    },

    {
        field: "action",
        headerName: "Actions",
        flex: 1,
        minWidth: 200,
        renderCell: (params) => {
        return (
        <Link to={""} style={{ textDecoration: "none" }}>
            <Typography sx={{ color: "#00796B", fontSize: "16px", fontWeight: 500, display: "inline-flex" }}>
                {params.value}
            </Typography>
        </Link>
        );
    }
    },
];