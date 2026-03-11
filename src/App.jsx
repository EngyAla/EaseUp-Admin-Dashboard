import { Route, Routes } from 'react-router';
import './App.css'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './Layouts/DashboardLayout';
import UsersList from './pages/UsersList/UsersList';
import NotFound from './pages/NotFound';
import CrisisLogs from './pages/CrisisLogs/CrisisLogs';
import AdminManagement from './pages/AdminManagement/AdminManagement';
import SettingsPage from './pages/SettingsPage/SettingsPage';
// import { useMemo, useState } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import getDesignToken from './theme';


function App() {
    // const  [mode, setMode] = useState(localStorage.getItem("currentMood") !== null ? localStorage.getItem("currentMood") : "light" );
    // const theme = useMemo(()=> createTheme(getDesignToken(mode)), [mode]);

  return (
    // <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='usersList' element={<UsersList />} />
          <Route path='crisisLogs' element={<CrisisLogs />} />
          <Route path='adminManagement' element={<AdminManagement />} />
          <Route path='settings' element={<SettingsPage />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    // </ThemeProvider>
  )
}

export default App;