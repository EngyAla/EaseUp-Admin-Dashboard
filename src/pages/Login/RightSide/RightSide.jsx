import Box from '@mui/material/Box';
import RightSideHeader from './RightSideHeader';
import RightSideForm from './RightSideForm';


const RightSide = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "start", gap: 5, p: 3 }}>
            <RightSideHeader />
            <RightSideForm />
        </Box>
    )
}

export default RightSide;