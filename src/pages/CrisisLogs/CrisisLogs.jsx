import { Box, Grid } from '@mui/material'
import Cards from '../../components/Cards'
import MyDataGrid from '../../components/MyDataGrid'
import { columns, rows } from './CrisisLogsData';
import WarningIcon from '@mui/icons-material/Warning';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const cardsData = [
    {
        title: "Critical Alerts",
        description: "Active high severity logs",
        mainNumber: "1,240",
        // subNumber: "+5%",
        icon: <WarningIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#8492A7",
        subColor: "#EBF2FE",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#00796B"
        }
    },
    {
        title: "Pending Review",
        description: "Assigned but not resolved",
        mainNumber: "856",
        // subNumber: "+8%",
        icon: <PendingActionsIcon sx={{ fontSize: 24 }} />,
        colors: {
        mainColor: "#8492A7",
        subColor: "#EBF2FE",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#00796B"
        }
    },
    {
        title: "Resolved Today",
        description: "Cases successfully handled",
        mainNumber: "12",
        // subNumber: "+8%",
        icon: <CheckCircleIcon sx={{fontSize: 24}} />,
        colors: {
        mainColor: "#8492A7",
        subColor: "#EBF2FE",
        mainTxtColor: "#64748B",
        subTxtColor: "#94A3B8",
        mainNumColor: "#00796B"
        // cardBgColor: "#FDF2F2"
        }
    }
];
const CrisisLogs = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4, }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                {cardsData.map((card, index) => (
                    <Grid key={index} size={{ xs: 12, md: 4 }}>
                        <Cards data={card} />
                    </Grid>
                ))}
            </Grid>
            <Box>
                <MyDataGrid rows={rows} columns={columns}/>
            </Box>
        </Box>
    )
}

export default CrisisLogs