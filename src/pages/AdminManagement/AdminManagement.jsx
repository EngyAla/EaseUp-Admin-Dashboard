// @ts-nocheck
import { Box, IconButton, Typography, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Avatar } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MyDataGrid from '../../components/MyDataGrid';
import { useEffect, useMemo, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { addAdminSchema } from '../../validations/vaildAddAdmin';
// import userImage from '../../assets/adminImage.jpg'
import { Link } from "react-router";
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import axiosInstance from '../../api/axiosInstance';


const AdminManagement = () => {
  const [adminsListData, setAdminsListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, formState: { errors, isSubmitting }, reset, watch } = useForm({
        mode: 'onChange',
        resolver: zodResolver(addAdminSchema),
        defaultValues: { role: ""}
    });
    const selectedRole = watch("role");
    const onSubmit = async ({fullName, email, role, password}) =>{
        try{
          const newAdminData = { fullName, email, role, password };
          await axiosInstance.post("Admins/add-admin",  newAdminData );
          getAdminsListData(); // انا ندهت عليها هنا عشان ال list تتحدت تلقائي بدون refresh
        } catch(error){
          if(error.response){
              const serverMessage = error.response.data.message || "Invalid email or password";
              alert(serverMessage);
          } else{
              alert("Network Error: Please check if the server is running.");
          }
          console.log("Full Error Data:", error.response?.data)
        }
      handleClose();
      reset();
    }
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
      reset();
    };

    const getAdminsListData = async () =>{
      try{
          const response = await axiosInstance.get("Admins/all-admins");
          setAdminsListData(response.data);
          setLoading(false);
      } catch(error){
          console.log("AdminsLis Error: ", error)
        }
      }
    useEffect(() =>{
          getAdminsListData();
      }, [adminsListData]);

    const rows = useMemo(() =>{
      return adminsListData?.map((admin, index) => ({
        id: index +1,
        name: admin.name,
        email: admin.email,
        status: admin.status,
        imageUrl: admin.imageUrl,
        lastActive: admin.lastActive || "Yesterday, 4:22 PM",
      }))
    }, [adminsListData])

  const columns = useMemo(() => [
    { 
        field: "id",
        headerName: "ID",
        width: 70 ,
        minWidth: 70
    },

    {
        field: "name",
        headerName: "User Details",
        flex: 1.5,
        minWidth: 170,
        renderCell: (params) => {
        const imageUrl = params.row.imageUrl || ""; 
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, lineHeight: "normal", py: 1 }}>
            <Avatar
                // component="img"
                src={imageUrl}
                alt={params.value}
                sx={{
                width: 35,
                height: 35,
                borderRadius: "50%",
                objectFit: "cover",
                border: "1px solid #e0e0e0"
                }}
            />
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                {params.value}
            </Typography>
            </Box>
        );
        }
    },

    {
        field: "email",
        headerName: "Email Address",
        flex: 1.5,
        minWidth: 200,
        renderCell: (params) =>{
        return(
            <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, display: "inline-flex" }}>
                {params.value}
            </Typography>
        )
        }
    },

    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 220,
        renderCell: (params) => {
        const status = params.value;
        const statuStyle = {
            admin: {bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0", dot: "#22C55E"},
            supervisor: {bg: "#429df834", color: "#3f86cc", border: "#2b8cee41"}
        }
        const style = statuStyle[status];
        return (
            <Box
            sx={{
            backgroundColor: style.bg, 
            color: style.color,
            px: 3,           
            py: .7, 
            border: `1px solid ${style.border}`,      
            borderRadius: 50,
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            lineHeight: "normal",
            fontWeight: 500,
            width: 100,
            }}
        >
            {params.value}
        </Box>
        );
    }
    },

    {
        field: "lastActive",
        headerName: "Last Active",
        flex: 1,
        minWidth: 170,
        renderCell: (params) =>{
        return(
            <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, display: "inline-flex" }}>
                {params.value}
            </Typography>
        )
        }
    },

    {
        field: "action",
        headerName: "Actions",
        flex: 1,
        minWidth: 200,
        renderCell: () => {
        return (
        <Link to={""} style={{ textDecoration: "none" }}>
            <Box
            sx={{
                display: "flex",
                alignItems: "center",
                lineHeight: "normal",
                mt: .5
            }}
            >
            <IconButton>
                <EditNoteOutlinedIcon sx={{ color: "#8b97a8" }} />
            </IconButton>
            <IconButton>
                <DeleteForeverOutlinedIcon sx={{ color: "#8b97a8" }} />
            </IconButton>
            </Box>
        </Link>
        );
    }
    },
  ], []);

    // console.log(adminsListData);



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, }}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="contained" sx={{ backgroundColor: "#00796B", display: "flex", gap: 1}} onClick={handleClickOpen}>
          <PersonAddOutlinedIcon sx={{ fontSize: 22 }} />
          <Typography sx={{ textTransform: "capitalize"}}>Add New Admin</Typography>
        </Button>
        <Dialog open={open} onClose={handleClose} sx={{  }}>
          <DialogTitle>Add New Admin</DialogTitle>
          <DialogContent sx={{ width: {xs: "auto", md: "600px"}, }}>
            <form onSubmit={handleSubmit(onSubmit)} id="subscription-form" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Box sx={{ flex: 1 }}>
                <TextField fullWidth variant="outlined" margin="dense" placeholder="Full Name"
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                  error={!!errors.fullName}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.fullName?.message}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField fullWidth variant="outlined" margin="dense" placeholder="admin@gmail.com" 
                  type="email"
                  id="email"
                  {...register('email')}
                  error={!!errors.email}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.email?.message}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, }}>
                <FormControl fullWidth margin="dense" sx={{ flex: 1 }}>
                  <Select
                    input={<OutlinedInput />}
                    value={selectedRole || ""}
                    label="Age"
                    // these for placeholder
                    displayEmpty
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span style={{ color: "#999" }}>Role</span>;
                      }
                      return selected;
                    }}
                    {...register('role')}
                    error={!!errors.role}
                  >
                    <MenuItem disabled value=""><em>Role</em></MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Supervisor">Supervisor</MenuItem>
                  </Select>
                  <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.role?.message}</Typography>
                </FormControl>
                <Box sx={{ flex: 1 }}>
                  <TextField fullWidth variant="outlined" margin="dense" placeholder="Password"
                  type="password"
                  id="password"
                  {...register('password')}
                  error={!!errors.password}
                  />
                  <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.password?.message}</Typography>
                </Box>
              </Box>
            </form>
          </DialogContent>
          <DialogActions sx={{ mb: 2, mr: 2 }}>
            <Button onClick={handleClose}  sx={{ borderColor: "#00796B", color: "#00796B"}}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} form="subscription-form" variant='contained' sx={{ backgroundColor: "#00796B", }}>
              Add Admin
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      { loading ? (
        <Typography sx={{ color: "#475569", fontSize: "14px", fontWeight: 400, textAlign: "center"}}>Loading...</Typography>
      ) : (
        <MyDataGrid rows={rows} columns={columns} />
      )}
    </Box>
  )
}

export default AdminManagement;