// @ts-nocheck
import { Avatar, Badge, Box, Button, ButtonBase, Divider, Switch, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
// import adminImage from '../../assets/adminImage.jpg';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../../validations/validProfile';
import { Controller } from 'react-hook-form'
import axiosInstance from '../../api/axiosInstance';
import { useProfile } from '../../Context/AdminProfileData/ProfileContext';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SettingsPage = () => {
    const fileInputRef = useRef(null);
    const [avatarSrc, setAvatarSrc] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem("token");

    const { profile, getProfile } = useProfile();

    const { handleSubmit, register, control, setValue, clearErrors, reset, formState: {errors, isSubmitting } } = useForm({
        mode: 'onChange',
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            email: "",
            currentPassword: "",
            newPassword: "",
            imageUrl: "",
            emailNotifications: true
        }
    });
    // console.log(adminData);

    // الجزء ده عشان ابدا اعرض الداتا اللي جايه من الباك
    useEffect(() =>{
        if(profile?.email){
            reset({
                name: profile.name || "Not Set Yet",
                email: profile.email,
                imageUrl: profile.imageUrl,
                emailNotifications: profile.emailNotifications ?? true
            });
            setAvatarSrc(profile.imageUrl);
        }
    }, [profile]);
    // control used for emailNotifications switch
    // setValue used for avatar input type file

    const onSubmit = async ({ name, email, currentPassword, newPassword, imageUrl, emailNotifications}) =>{
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);

        if (currentPassword) formData.append("currentPassword", currentPassword);
        if (newPassword) formData.append("newPassword", newPassword);
        if (imageUrl) formData.append("imageUrl", imageUrl);
        formData.append("emailNotifications", emailNotifications);

        // console.log("errors:", errors);
        // console.log("Submited:", profileData);
        try{
            const response = await axiosInstance.put("Admins/update-profile-information",
                formData, 
                {
                    headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data" 
                    }
                }
            );
            if(response.status === 200){
                await getProfile();
            }
            // console.log(response);
            console.log(formData)
        } catch(error){
            console.log("Update Admin Profile Error: ", error)
        }
        // reset({name, email, emailNotifications});
        setIsEditing(false);
    }

    // هنا حولت الصوره بدل ما ابعتها ك file بعتها ك string: base64
    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
            const base64 = reader.result;
            setValue("imageUrl", file, {shouldValidate: true})
            // setAvatarSrc(reader.result); 
            setValue("imageUrl", base64, { shouldValidate: true })
            setAvatarSrc(base64); // للعرض في ال ui
        };
        reader.readAsDataURL(file);
        }
    };
    // console.log("Current Validation Errors:", errors);


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 50 }}>
            {/*  part 1  */}
            <Box sx={{ display: "flex", flexDirection: "column", padding: "2% 3%", boxShadow: "1px 1px 5px rgba(189, 189, 189, 0.3)",  }}>
                <Box sx={{ display: "flex", flexDirection: "column", }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: "center", sm: "start"}, flexDirection: {xs: "column", sm: "row"}, textAlign: {xs: "center", sm: "start"}, gap: 3, mb: 1}}>
                        <ButtonBase component="label" role={undefined} tabIndex={-1} aria-label="Avatar image"
                            sx={{ borderRadius: '40px', '&:has(:focus-visible)': { outline: '2px solid', outlineOffset: '2px'}}}>
                            <Badge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={<Avatar sx={{ bgcolor: "#00796B", width: 22, height: 22 }}><CameraAltOutlinedIcon sx={{ fontSize: 14}}/></Avatar>}>
                                <Avatar alt="Admin Image" src={avatarSrc || undefined} sx={{ width: 80, height: 80 }}/>
                            </Badge>
                            { isEditing && (
                            <>
                                <input type="file" accept="image/*" 
                                    style={{ border: 0, clip: 'rect(0 0 0 0)', height: '1px', margin: '-1px', overflow: 'hidden', padding: 0, position: 'absolute', whiteSpace: 'nowrap', width: '1px', }}
                                    ref={fileInputRef}
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
                                    ref={fileInputRef}
                                    onChange={handleAvatarChange}
                                />
                            </Button>
                            <Button onClick={() => {
                                setAvatarSrc(undefined) // for ui not for zod
                                setValue("imageUrl", undefined, {shouldValidate: true}) // for zod
                                clearErrors("imageUrl")
                                // in default satuation html input still save the wrong value in it عشان كده مش بيظهر الصوره الخطا لو اخترناها مرتين ورا بعض
                                if(fileInputRef) fileInputRef.current.value = ""; // if user choose the same wrong error again, show it and show errors also
                                }} variant="text" size="small" sx={{ color: "#64748B", textTransform: "capitalize"}}>
                                Remove
                            </Button>
                        </>
                        )}
                        </Box>
                    </Box>
                    <Box height={70}>
                        <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.imageUrl?.message}</Typography>
                    </Box>
                </Box>
                {/*  part 2  */}
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: {xs: "center", sm: "start"}, flexDirection: {xs: "column", sm: "row"}, gap: 3, }}>
                    <Box flex={1} height={100}>
                        <TextField fullWidth variant="outlined" margin="dense" placeholder="Full Name" 
                        sx={{ "& fieldset": {
                            border: isEditing ? "" : "none",
                            backgroundColor: isEditing ? "" : "#dddddd57",
                        } }}
                        // slotProps={{input: { readOnly: !isEditing && true },}}
                        type="text" id="fullName" 
                        // value={adminData.name} 
                        disabled={!isEditing}
                        {...register('name')}
                        error={!!errors.name}
                        />
                        <Typography variant='body2' sx={{ color: "#d32f2f", }}>{errors.name?.message}</Typography>
                    </Box>
                    <Box flex={1} height={100}>
                        <TextField fullWidth variant="outlined" margin="dense" placeholder="admin@gmail.com" 
                        sx={{ "& fieldset": {
                            border: isEditing ? "" : "none",
                            backgroundColor: isEditing ? "" : "#dddddd57",
                        } }}
                        type="email" id="email"
                        // value={adminData.email}
                        disabled={!isEditing}
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
                                {...register('currentPassword')}
                                error={!!errors.currentPassword}
                                />
                                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.currentPassword?.message}</Typography>
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
            {/*  part 3  */}
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
            {/*  part 4  */}
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
                    } } } 
                    type={isEditing ? 'submit' : 'button'} disabled={isSubmitting}  variant="contained" sx={{ textTransform: "capitalize" }} >
                    { isEditing ? "Save All Settings" : "Edit your profile"}
                </Button>
            </Box>
        </form>
    )
}

export default SettingsPage;