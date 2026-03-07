import React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chip from "@mui/material/Chip";



const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#fff",
    boxShadow: "none",
    borderBottom: "1px solid #d3d3d3",
    variants: [
        {
        props: ({ open }) => open,
        style: {
            marginLeft: drawerWidth,
            backgroundColor: "#fff",
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
            }),
        },
        },
    ],
}));

const TopBar = ({ open, handleDrawerOpen, setMode }) => {
    
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                color="black"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                    {
                    marginRight: 5,
                    },
                    open && { display: "none" },
                ]}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" color="#0F172A">
                    Dashboard overview
                </Typography>
                <Box sx={{flexGrow: 1}}></Box>
                <Box sx={{display: "flex", alignItems: "center", gap: 3}}>
                    <Box sx={{width: 8, height: 8, borderRadius: "50%", backgroundColor: "#EC5252", position: "relative"}}>
                        <NotificationsIcon sx={{color: "#475569", fontSize: 28, position: "absolute", left: "-25px", top: "-10px"}} />
                    </Box>
                    <Chip label="System Online" variant="outlined" sx={{display: "flex", flexDirection: "row-reverse", pr: 3, pl: 1, color: "#334155"}} icon={<StyledBadge overlap="circular" variant="dot" ></StyledBadge>}  />
                </Box>
                
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
