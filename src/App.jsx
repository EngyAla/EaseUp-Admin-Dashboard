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
import {  ThemeProvider } from '@mui/material/styles';
// import getDesignToken from './theme';
import {formsTheme} from "./createTheme";
import StudentProfile from './pages/StudentProfile/StudentProfile';
import ProtectedRoute from './ProtectedRoute';


function App() {
    // const  [mode, setMode] = useState(localStorage.getItem("currentMood") !== null ? localStorage.getItem("currentMood") : "light" );
    // const theme = useMemo(()=> createTheme(getDesignToken(mode)), [mode]);

  return (
    <ThemeProvider theme={formsTheme}>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='usersList' element={<UsersList />} />
            <Route path='crisisLogs' element={<CrisisLogs />} />
            <Route path='studentProfile/:studentID' element={<StudentProfile />} />
            <Route path='adminManagement' element={<AdminManagement />} />
            <Route path='settings' element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;