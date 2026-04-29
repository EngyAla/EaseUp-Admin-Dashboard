// @ts-nocheck
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../../validations/validLogin';
import axiosInstance from '../../../api/axiosInstance';


const RightSideForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, formState: {errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) =>{
        try{
            const response = await axiosInstance.post('Auth/login', {
                email: data.email,
                password: data.password,
                rememberMe: false
            });
            console.log(response);
            if(response.data.isAuthenticated){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", JSON.stringify(response.data.roles));
                reset();
                navigate("/dashboard");
            } else{
                alert(response.data.message);
            }
        } catch(error){
            if(error.response){
                const serverMessage = error.response.data.message || "Invalid email or password";
                alert(serverMessage);
            } else{
                alert("Network Error: Please check if the server is running.");
            }
            console.log("Full Error Data:", error.response?.data)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{width: "100%", display: "flex", flexDirection: "column", gap: 5}}>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='email'style={{ width: "fit-content"}}>Email Address</label>
                <TextField variant="outlined" id="email" sx={{width: {sm: "100%", md: "90%"},}}
                type='email' 
                placeholder='admin@gmail.com' 
                {...register('email')}
                error={!!errors.email}
                // helperText={errors.email?.message}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <label htmlFor='password' style={{ width: "fit-content"}}>Password</label>
                <TextField variant="outlined" id="password" sx={{width: {sm: "100%", md: "90%"},}}
                type='password' 
                placeholder='Enter your password'
                {...register('password')}
                error={!!errors.password}
                // helperText={errors.password?.message}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.password?.message}</Typography>
            </Box>
            <Button variant="contained"
            sx={{width: {xs: "100%", md: "90%"}, backgroundColor: "#00796B", py: 1.3 }}
            type="submit"
            disabled={isSubmitting}
            >
                login
            </Button>
            <Typography variant='body1' sx={{color: "#94A3B8", textAlign: "center", fontWeight: 400, fontSize: 12}}>© 2026 EaseUp Wellness Platform. All rights reserved.</Typography>
        </Box>
    )
}

export default RightSideForm;