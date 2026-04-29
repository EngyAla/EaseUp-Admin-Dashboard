// @ts-nocheck
import { Avatar, Badge, Box, Button, Chip, styled, Typography } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { UsersListContext } from '../../Context/UsersList/UsersListContext';


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

const StuTopCard = ({ studentData }) => {
    const status = studentData?.status;
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
    // console.log(studentData)
    return (
        <>
            <Box textAlign={ "end" }>
                <Button 
                    variant='contained' 
                    component="a" 
                    href={`mailto:${studentData?.email}?subject=Inquiry&body=Hello, I would like to talk to you about...`}
                    aria-label='email' 
                    sx={{ textTransform: "capitalize", gap: 1, mb: 3 }}
                >
                    <ContactMailIcon sx={{ fontSize: 20 }} /> 
                    Contact via Email
                </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}, textAlign: {xs: "center", sm: "start"}, alignItems: "center", gap: 3, padding: "2% 3%", boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)" }}>
                <StyledBadge overlap="rectangular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
                    <Avatar sx={{ width: 100, height: 100, borderRadius: "5px"}}  src={`${studentData?.imageUrl}`} />
                </StyledBadge>
                <Box>
                    <Box sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}, textAlign: {xs: "center", sm: "start"}, alignItems: "center", gap: 2, mb: 2 }}>
                        <Typography variant='h6' sx={{ color: "#0F172A", fontSize: "24px", fontWeight: 600 }}>{studentData?.name}</Typography>
                        <Chip size="small" label={studentData?.status || "Active"} sx={{ bgcolor: style.bg, color: style.color, fontWeight: 500, px: 1, py: 1.6, }} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: {xs: "column", sm: "row"}, textAlign: {xs: "center", sm: "start"}, gap: 3}}>
                        <Typography variant='body2' sx={{ display: "flex", alignItems: "center", gap: .5, color: "#475569"}}>ID: {studentData?.id}</Typography>
                        <Typography variant='body2' sx={{ display: "flex", alignItems: "center", gap: .5, color: "#475569", wordBreak: "break-word"}}><MailOutlineIcon sx={{ fontSize: 20}}/> {studentData?.email}</Typography>
                        <Typography variant='body2' sx={{ display: "flex", alignItems: "center", gap: .5, color: "#475569"}}><ApartmentIcon sx={{ fontSize: 20}}/>{studentData?.university}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default StuTopCard;