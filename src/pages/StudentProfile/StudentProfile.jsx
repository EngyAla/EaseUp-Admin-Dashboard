// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Avatar, Badge, Box, Button, Chip, Grid, styled, Typography } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ApartmentIcon from '@mui/icons-material/Apartment';
import StuTopCard from './StuTopCard';
import AcademicSummaryTable from './academicSummaryTable';
import RecentActivityTable from './RecentActivityTable';
import AdminNotes from './AdminNotes';
import { UsersListContext } from '../../Context/UsersList/UsersListContext';
import axiosInstance from '../../api/axiosInstance';


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
    const [studentData, setStudentData] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{
        const getStudentData = async () =>{
            try{
                const response = await axiosInstance.get("Admins/student-profile-information",{
                    params: {
                        studentId: studentID // Axios هيحط الـ ? والـ studentId لوحده
                    }
                });
                setStudentData(response.data);
                setLoading(false)
            } catch(error){
                console.log("Profile Error: ", error);
                setLoading(false)
            }
        }
        getStudentData()
    }, [studentID]);
    
    console.log(studentData);
    if (loading) return <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, textAlign: "center" }}>Loading Student Data...</Typography>;
    return (
        <Box>
            <StuTopCard studentData={studentData} />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <AcademicSummaryTable studentData={studentData} />
                        <RecentActivityTable studentData={studentData} />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <AdminNotes studentData={studentData} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default StudentProfile;