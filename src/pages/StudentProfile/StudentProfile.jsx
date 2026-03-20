// @ts-nocheck
import React from 'react'
import { useParams } from 'react-router'
import { rows } from '../UsersList/UsersListData'
import { Avatar, Badge, Box, Button, Chip, Grid, styled, Typography } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StuTopCard from './StuTopCard';
import AcademicSummaryTable from './academicSummaryTable';
import RecentActivityTable from './RecentActivityTable';
import AdminNotes from './AdminNotes';


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

const StudentProfile = () => {
    const { studentID } = useParams();
    const student = rows.find((stu) =>{
        return stu.id == studentID
    })
    console.log(student);
    return (
        <Box>
            <StuTopCard />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <AcademicSummaryTable />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <AdminNotes />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <RecentActivityTable />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default StudentProfile;