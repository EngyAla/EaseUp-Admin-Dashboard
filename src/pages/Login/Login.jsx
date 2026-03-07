import Grid from '@mui/material/Grid';
import LeftSide from './LeftSide';
import RightSide from './RightSide/RightSide';


const Login = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
                <LeftSide />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
                <RightSide />
            </Grid>
        </Grid>
    )
}

export default Login;