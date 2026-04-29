import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Typography, } from '@mui/material'
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import MyDataGrid from '../../components/MyDataGrid';
import { columns, rows } from './AdminManagementData';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { addAdminSchema } from '../../validations/vaildAddAdmin';

const AdminManagement = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, register, formState: { errors, isSubmitting }, reset, watch } = useForm({
          mode: 'onChange',
          resolver: zodResolver(addAdminSchema),
          defaultValues: { role: ""}
      });
  const selectedRole = watch("role");
  const onSubmit = ({full_name, email, role, password}) =>{
      const newAdminData = { full_name, email, role, password };
      console.log(newAdminData);
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
                  {...register('full_name')}
                  error={!!errors.full_name}
                />
                <Typography variant='body2' sx={{ color: "#d32f2f" }}>{errors.full_name?.message}</Typography>
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
      <MyDataGrid rows={rows} columns={columns} />
    </Box>
  )
}

export default AdminManagement;