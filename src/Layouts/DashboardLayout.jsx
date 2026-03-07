import { createTheme, styled, ThemeProvider } from '@mui/material/styles'
import React, { useMemo, useState } from 'react'
import getDesignToken from '../theme'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router';
import Typography from '@mui/material/Typography';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const DashboardLayout = () => {
    const  [mode, setMode] = useState(localStorage.getItem("currentMood") !== null ? localStorage.getItem("currentMood") : "light" );
    const theme = useMemo(()=> createTheme(getDesignToken(mode)), [mode]);
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar setMode={setMode} handleDrawerOpen={handleDrawerOpen} open={open} />
                <SideBar handleDrawerClose={handleDrawerClose} open={open}/>
                <Box component={'main'} sx={{ flexGrow: 1, p: 3, backgroundColor: "#F8FAFC", height: "100vh" }}>
                    <DrawerHeader />
                    <Typography sx={{ marginBottom: 2}}>
                        <Outlet />
                    </Typography>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default DashboardLayout;