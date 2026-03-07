import { Route, Routes } from 'react-router';
import './App.css'
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import DashboardLayout from './Layouts/DashboardLayout';
import UsersList from './pages/UsersList/UsersList';
import NotFound from './pages/NotFound';


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='usersList' element={<UsersList />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;