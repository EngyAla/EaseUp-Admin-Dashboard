import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router';
import Box from '@mui/material/Box';

const RightSideForm = () => {
    return (
        <Box component="form" sx={{width: "100%", display: "flex", flexDirection: "column", gap: 5}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label for='email'style={{ width: "fit-content"}}>Email Address</label>
                <TextField type='email' id="email" variant="outlined" placeholder='admin@university.edu' color='success' sx={{width: {sm: "100%", md: "90%"}}}/>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label for='password' style={{ width: "fit-content"}}>Password</label>
                <TextField type='password' id="password" variant="outlined" color='success' sx={{width: {sm: "100%", md: "90%"}}}/>
            </Box>
            <Link to={'/dashboard'}>
                <Button variant="contained"  sx={{width: {xs: "100%", md: "90%"}, backgroundColor: "#00796B", py: 1.3 }}>login</Button>
            </Link>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 400, fontSize: 12}}>© 2026 EaseUp Wellness Platform. All rights reserved.</Typography>
        </Box>
    )
}

export default RightSideForm