// @ts-nocheck
import { Avatar, Badge, Box, Button, ButtonBase, Divider, Switch, TextField, Typography } from '@mui/material'
import { useState } from 'react'
// import adminImage from '../../assets/adminImage.jpg';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../validations/validProfile';
import { Controller } from 'react-hook-form'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SettingsPage = () => {
    const [avatarSrc, setAvatarSrc] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [fakeAdminData, setfakeAdminData] = useState({fullName: "Engy Alaa", email: "engy@gmail.com"})
    const { handleSubmit, register, control, setValue, clearErrors, formState: {errors, isSubmitting }, reset } = useForm({
        mode: 'onChange',
        // reValidateMode: "onChange",
        resolver: zodResolver(profileSchema),
        defaultValues: {
        full_name: fakeAdminData.fullName,
        email: fakeAdminData.email,
        password: "",      // مهم جداً
        newPassword: "",   // مهم جداً
        avatar: undefined,
        emailNotifications: true
    }
    });

    const onSubmit = ({ full_name, email, password, newPassword, avatar, emailNotifications}) =>{
        const profileData = { full_name, email, password, newPassword, avatar, emailNotifications };
        console.log("errors:", errors);
        console.log("Submited:",profileData);
        setfakeAdminData({fullName: full_name, email: email});
        reset({full_name, email, emailNotifications});
        setIsEditing(false)
    }

    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
        setValue("avatar", file, {shouldValidate: true})
        // Read the file as a data URL
        const reader = new FileReader();
        reader.onload = () => {
            setAvatarSrc(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };
    // console.log("Current Validation Errors:", errors);
    return (
    <Box sx={{ }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 50 }}>
            <Box sx={{ display: "flex", flexDirection: "column", padding: "2% 3%", boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)",  }}>
                <Box sx={{ display: "flex", flexDirection: "column", }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: "center", sm: "start"}, flexDirection: {xs: "column", sm: "row"}, textAlign: {xs: "center", sm: "start"}, gap: 3, mb: 1}}>
                        <ButtonBase component="label" role={undefined} tabIndex={-1} aria-label="Avatar image"
                            sx={{ borderRadius: '40px', '&:has(:focus-visible)': { outline: '2px solid', outlineOffset: '2px'}}}>
                            <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={<Avatar sx={{ bgcolor: "#00796B", width: 22, height: 22 }}><CameraAltOutlinedIcon sx={{ fontSize: 14}}/></Avatar>}>
                                <Avatar alt="Admin Image" src={avatarSrc} sx={{ width: 80, height: 80 }}/>
                            </Badge>
                            { isEditing && (
                            <>
                                <input type="file" accept="image/*" 
                                    style={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px', }}
                                    onChange={handleAvatarChange}
                                />
                            </>
                            )}
                        </ButtonBase>
                        <Box>
                            <Typography variant='body1' sx={{ color: "#0F172A", fontSize: "16px", fontWeight: 500}}>Profile Photo</Typography>
                            <Typography variant='body2' sx={{ color: "#64748B", fontSize: "12px", mb: .5}}>oPG, Gla or PNG, Max size of 800k</Typography>
                        { isEditing && (
                        <>
                            <Button component="label" variant="outlined" size="small" sx={{ color: "#00796B", backgroundColor: "#EFF4F5", border: "1px solid #13B6EC33",  textTransform: "capitalize"}}>
                                Upload New
                                <input type="file" accept="image/*" 
                                    style={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px', }}
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                            <Button onClick={() => {
                                setAvatarSrc(undefined)
                                reset({ avatar: undefined })
                                }} variant="text" size="small" sx={{ color: "#64748B", textTransform: "capitalize"}}>
                                Remove
                            </Button>
                        </>
                        )}
                        </Box>
                    </Box>
                    <Box  mb={5}>
                        {errors.avatar && (
                            <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.avatar.message}</Typography>
                        )}
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: "center", sm: "start"}, flexDirection: {xs: "column", sm: "row"}, gap: 3, }}>
                    <Box flex={1} height={100}>
                        <TextField fullWidth variant="outlined" margin="dense" placeholder="Full Name" 
                        type="text" id="fullName"  
                        disabled={!isEditing}
                        // value={fakeAdminData.fullName}
                        {...register('full_name')}
                        error={!!errors.full_name}
                        />
                        <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.full_name?.message}</Typography>
                    </Box>
                    <Box flex={1} height={100}>
                        <TextField fullWidth variant="outlined" margin="dense" placeholder="admin@gmail.com" 
                        type="email" id="email"
                        disabled={!isEditing}
                        // value={fakeAdminData.email}
                        {...register('email')}
                        error={!!errors.email}
                        />
                        <Typography variant='body2' sx={{ color: "#d32f2f",  }}>{errors.email?.message}</Typography>
                    </Box>
                </Box>
                { isEditing && (
                    <>
                        <Typography variant='body1' mt={4} sx={{ color: "#0F172A", fontSize: "16px", fontWeight: 500}}>Change Password</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: "center", sm: "start"}, flexDirection: {xs: "column", sm: "row"}, gap: 3 }}>
                            <Box flex={1} height={100}>
                                <TextField fullWidth variant="outlined" margin="dense" placeholder="Current Password"
                                type="password" id="password"
                                {...register('password')}
                                error={!!errors.password}
                                />
                                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.password?.message}</Typography>
                            </Box>
                            <Box flex={1} height={100}>
                                <TextField fullWidth variant="outlined" margin="dense" placeholder="New Password"
                                type="password" id="password"
                                {...register('newPassword')}
                                error={!!errors.newPassword}
                                />
                                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.newPassword?.message}</Typography>
                            </Box>
                        </Box>
                    </>
                )}
            </Box>
            <Box sx={{ boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)", padding: "2% 3%",}}>
                <Typography variant='body1' sx={{ color: "#0F172A", fontSize: "18px", fontWeight: 500}}>Notification Preferences</Typography>
                <Box sx={{ display: "flex", alignItems: "center"}}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant='body1' sx={{ color: "#0F172A", fontSize: "16px", fontWeight: 500, mt: 3}}>Email Notifications</Typography>
                        <Typography variant='body2' sx={{ color: "#64748B", fontSize: "12px", mb: .5}}>Receive weekly reports and security alerts via email</Typography>
                    </Box>
                    <Controller 
                    control={control}
                    name='emailNotifications'
                    render={({field}) =>(
                        <Switch
                        {...label} 
                        {...field}
                        disabled={!isEditing}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        />
                    )}
                    />
                </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: {xs: "column-reverse", sm: "row"}, justifyContent: "end", gap: 2, whiteSpace:"nowrap"}}>
                { isEditing && 
                <Button onClick={() => {
                    setIsEditing(false)
                    reset()
                }} variant="outlined" sx={{ color: "#64748B",  border: "1px solid #64748B", textTransform: "capitalize"}}>
                    Discard Changes
                </Button>
                }
                <Button onClick={(e) => { if(!isEditing) {
                    e.preventDefault()
                    setIsEditing(true)
                    clearErrors()
                    } } } type={isEditing ? 'submit' : 'button'} disabled={isSubmitting}  variant="contained" sx={{ textTransform: "capitalize" }} >
                    { isEditing ? "Save All Settings" : "Edit your profile"}
                </Button>
            </Box>
        </form>
    </Box>
    )
}

export default SettingsPage;