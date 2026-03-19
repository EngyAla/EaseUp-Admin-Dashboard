import { Box, IconButton, Typography } from "@mui/material";
import userImage from '../../assets/adminImage.jpg'
import { Link } from "react-router";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export const rows = [
    {
        id: 1,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 2,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Supervisor",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 3,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 4,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Supervisor",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 5,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 6,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Supervisor",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 7,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 8,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
    {
        id: 9,
        userDetails: "Ali Ahmed",
        email: "JonSnow@gmail.com",
        status: "Admin",
        lastActive: "Yesterday, 4:22 PM",
        action: "View",
        imageUrl: userImage
    },
];

export const columns = [
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
        const imageUrl = params.row.imageUrl || "https://tse4.mm.bing.net/th/id/OIP.hXWwNOQw15ZVWKlMs-xv0wHaFQ?rs=1&pid=ImgDetMain&o=7&rm=3"; 
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, lineHeight: "normal", py: 1 }}>
            <Box
                component="img"
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
            Admin: {bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0", dot: "#22C55E"},
            Supervisor: {bg: "#429df834", color: "#3f86cc", border: "#2b8cee41"}
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
            width: 100,
            }}
        >
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
                {params.value}
            </Typography>
        )
        }
    },

    {
        field: "action",
        headerName: "Actions",
        flex: 1,
        minWidth: 200,
        renderCell: () => {
        return (
        <Link to={""} style={{ textDecoration: "none" }}>
            <Box
            sx={{
                display: "flex",
                alignItems: "center",
                lineHeight: "normal",
                mt: .5
            }}
            >
            <IconButton>
                <EditNoteOutlinedIcon sx={{ color: "#8b97a8" }} />
            </IconButton>
            <IconButton>
                <DeleteForeverOutlinedIcon sx={{ color: "#8b97a8" }} />
            </IconButton>
            </Box>
        </Link>
        );
    }
    },
];