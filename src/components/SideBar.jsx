import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from "react-router";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import logo from '../assets/logo3.png'
import Avatar from "@mui/material/Avatar";



const drawerWidth = 240;

const Drawer = styled(
    MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
    })(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    backgroundColor: "red",
    variants: [
        {
        props: ({ open }) => open,
        style: {
            ...openedMixin(theme),
            "& .MuiDrawer-paper": openedMixin(theme),
        },
        },
        {
        props: ({ open }) => !open,
        style: {
            ...closedMixin(theme),
            "& .MuiDrawer-paper": closedMixin(theme),
        },
        },
    ],
})
);

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: "#fff"
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    backgroundColor: "#fff"

});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));



let sideBarSections = [
    {
        "text": "Overview",
        "icon": <DashboardIcon />,
        "path": "/dashboard"
    },
    {
        "text": "Users List",
        "icon": <PeopleAltIcon />,
        "path": "/dashboard/usersList"
    },
    {
        "text": "Crisis Logs",
        "icon": <ReportProblemIcon />,
        "path": "/dashboard/crisisLogs"
    },
    {
        "text": "Add Admin",
        "icon": <PersonAddAlt1Icon />,
        "path": "/dashboard/addAdmin"
    },
    {
        "text": "Settings",
        "icon": <SettingsIcon />,
        "path": "/dashboard/settings"
    },
]

const SideBar = ({open, handleDrawerClose}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer variant="permanent" open={open} >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    { theme.direction === "rtl" ? (<ChevronRightIcon />) : (<ChevronLeftIcon />) }
                </IconButton>
            </DrawerHeader>
            <Divider />
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", gap: 1.5, py: 1.3}}>
                <img src={logo} alt="logo" width={55} height={55} />
                <Box sx={[ open ? {display: "block"}: {display: "none"} ]}>
                    <Typography variant="h6" sx={{color: "#0F172A", fontWeight: 700, fontSize: "18px"}}>Ease Up</Typography>
                    <Typography variant="body1" sx={{color: "#64748B", fontWeight: 400, fontSize: "14px"}}>Admin Dashboard</Typography>
                </Box>
            </Box>
            <Divider />
            <List sx={{flexGrow: 1}}>
                {sideBarSections.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                    <ListItemButton onClick={() => navigate(item.path)}
                    sx={[
                        {
                        minHeight: 48,
                        px: 2.5,
                        m: 1,
                        bgcolor: location.pathname === item.path ? "#E0F2F1" : null,
                        borderRadius: location.pathname === item.path ? 2 : null,
                        borderRight: location.pathname === item.path && open ? "3px solid #00796B" : null,
                        color: location.pathname === item.path ? "#00796B" : "#475569"
                        },
                        open
                        ? {
                            justifyContent: "initial",
                            }
                        : {
                            justifyContent: "center",
                            },
                    ]}
                    >
                    <ListItemIcon
                        sx={[
                        {
                            minWidth: 0,
                            justifyContent: "center",
                            color: location.pathname === item.path ? "#00796B" : "#475569"
                        },
                        open
                            ? {
                                mr: 3,
                            }
                            : {
                                mr: "auto",
                            },
                        ]}
                    >
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={item.text}
                        sx={[
                        open
                            ? {
                                opacity: 1,
                            }
                            : {
                                opacity: 0,
                            },
                        ]}
                    />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            <Box  sx={{display: "flex", justifyContent: open ? "space-between" : "center", alignItems: "center", gap: 1, p: 1.3}}>
                <Box sx={{display: "flex", alignItems:"center", gap: 1 }}>
                    <Avatar alt="Engy Alaa" src="none" sx={{width: 45, height: 45,}} />
                    <Box sx={[ open? {display: "block"}: {display: "none"} ]}>
                        <Typography variant="h6" sx={{color: "#0F172A", fontWeight: 700, fontSize: "14px"}}>Engy Alaa</Typography>
                        <Typography variant="body1" sx={{color: "#64748B", fontWeight: 400, fontSize: "12px"}}>System Admin</Typography>
                    </Box>
                </Box>
                <LogoutIcon sx={[{color: "#94A3B8", cursor: "pointer"}, open? {display: "block"}: {display: "none"}]}/>
            </Box>
        </Drawer>
    );
};

export default SideBar;
