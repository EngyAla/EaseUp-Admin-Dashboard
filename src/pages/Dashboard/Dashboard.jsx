import Cards from '../../components/Cards';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useContext } from 'react';
import { OverviewContext } from '../../Context/Overview/OverviewContext';
import { Box, Typography } from '@mui/material';
import AdminLineChart from './AdminLineChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import CombinedChart from './CombinedChart';
import AdminBarChart from './AdminBarChart';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider.css'
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Dashboard() {
    const [age, setAge] = useState('');

    // @ts-ignore
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const { overviewData } = useContext(OverviewContext);
    
    const cardsData = [
    {
        title: "Total Users",
        description: "Overall registered participants",
        mainNumber: overviewData.users,
        subNumber: "+12.5%",
        icon: <PersonIcon sx={{ fontSize: 24 }} />,
        path: "/dashboard/usersList",
        colors: {
        mainColor: "#00796B",
        subColor: "#E0F2F1",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Active Users",
        description: "Active in the last 24 hours",
        mainNumber: overviewData.activeUsers,
        subNumber: "+8%",
        icon: <BoltIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#2563EB",
        subColor: "#E3F2FD",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#0F172A"
        }
    },
    {
        title: "Active Crisis Alerts",
        description: "Requires immediate attention",
        mainNumber: overviewData.crisisUsers,
        // subNumber: "+8%",
        icon: <ReportProblemIcon sx={{fontSize: 22}} />,
        path: "/dashboard/crisisLogs",
        colors: {
        mainColor: "#C62828",
        subColor: "#FCEBEB",
        mainTxtColor: "#D15353",
        subTxtColor: "#DD7E7E",
        mainNumColor: "#C62828",
        cardBgColor: "#FDF2F2"
        }
    }
];

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                {cardsData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Cards data={card} />
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={{ xs: 2, md: 3 }}  >
                <Grid size={{ xs: 12 }} sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px", mt: 3}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant='body1' sx={{ flexGrow: 1}}>Your state dashboard</Typography>
                        <Box sx={{ minWidth: 570, display: "flex", gap: 5, alignItems: "center" }} >
                            <FormControl fullWidth size="small" variant="standard">
                                <InputLabel id="demo-simple-select-label">Acadimic year</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="decorator"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small" variant="standard">
                                <InputLabel id="demo-simple-select-label">Department</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="decorator"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth size="small" variant="standard">
                                <InputLabel id="demo-simple-select-label">Month of Date</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="decorator"
                                onChange={handleChange}
                                >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>

                <Swiper
                pagination={{
                type: 'fraction',
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                >
                    <SwiperSlide>
                        <Grid size={{ xs: 12, md: 12}}>
                            <Box sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px" }}>
                                <Typography variant='body1' sx={{ flexGrow: 1}}>Students <span style={{ fontWeight: "bold", fontSize: "20px"}}>Depression</span> level over semseter</Typography>
                                <AdminLineChart />
                            </Box>
                        </Grid>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Box sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px", }}>
                                <Typography variant='body1' sx={{ flexGrow: 1}}>Almpact of Academic Factors on Student Stress Levels</Typography>
                                <CombinedChart />
                            </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6}}>
                            <Box sx={{ bgcolor: "#fff", border: "1px solid #e1e0e0a9", p: 2, borderRadius: "5px", ml: 2 }}>
                                <Typography variant='body1' sx={{ flexGrow: 1}}>Average GAD Symptom Scores</Typography>
                                <AdminBarChart />
                            </Box>
                        </Grid>
                    </SwiperSlide>
                </Swiper>
            </Grid>
        </>
    );
}