import Box from '@mui/material/Box'
import SpaIcon from '@mui/icons-material/Spa';
import Typography from '@mui/material/Typography';
import loginImage from '../../assets/loginImage.png'

const LeftSide = () => {
    return (
        <Box sx={{backgroundColor: "#A3C0BEB2", height: {xs: "fit-content", md: "100vh"}, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 5, p: 3, borderRadius: {xs: "0px 0px 30px 30px", md: "0px"} }}>
            <Box sx={{bgcolor: "#fff", p: 1, borderRadius: 2}}>
                <SpaIcon sx={{color: "#00796B", fontSize: "42px"}}  />
            </Box>
            <Box sx={{textAlign: "center"}}>
                <Typography variant='h5' component='h1' sx={{ color: '#0F172A', fontWeight: 600, fontSize: { xs: 28, md: 32 } }} >Find your inner calm and academic balance</Typography>
                <Typography variant='body1' sx={{ color: '#475569', fontWeight: 400, fontSize: 16, mt: 2 }} >Join thousands of students who prioritize their mental well-being with EaseUp.</Typography>
            </Box>
            <Box sx={{
                    width: { xs: 180, md: 256 },
                    height: { xs: 180, md: 256 }, 
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid #fff",
                    boxShadow: 3 ,
                    display: { xs: "none", md: "flex" },}}>
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={loginImage} alt="login image" loading='lazy' width={"100%"} height={"100%"}  />
            </Box>
        </Box>
    )
}

export default LeftSide;