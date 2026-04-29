import Box from '@mui/material/Box'
import logo from '../../../assets/logo3.png';
import Typography from '@mui/material/Typography';

const RightSideHeader = () => {
    return (
        <>
            <Box sx={{display: "flex", alignItems: "center", gap: 2 }}>
                <Box sx={{width:60, height: 60, borderRadius: "50%", overflow: "hidden", }}>
                    <img src={logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover"}} loading='lazy' />
                </Box>
                <Typography variant='h6' sx={{ fontSize: "24px", fontWeight: "600", color: "#0F172A"}}>EaseUp</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Typography variant='h4' sx={{ fontSize: "30px", fontWeight: "700", color: "#0F172A"}}>Admin Login</Typography>
                <Typography variant='body1' sx={{ fontSize: "16px", fontWeight: "400", color: "#64748B"}}>Please enter your details to sign in to your account.</Typography>
            </Box>
        </>
    )
}

export default RightSideHeader;