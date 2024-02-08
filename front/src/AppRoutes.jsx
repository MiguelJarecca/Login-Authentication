import './App.css'

import { LoginPage } from './auth/pages/LoginPage'

import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoute } from './routes/UserRoute';
import { UseAuth } from './auth/hooks/UseAuth';
import { Home } from './components/Home';
import { RegisterPage } from './pages/RegisterPage';

export const AppRoutes = () => {

    const { login } = UseAuth();

    return (
        <Routes>
            {login.isAuth
            ? (
                <Route path='/*' element={<UserRoute />}/>
                ) 
            : <>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path="users/register" element={<RegisterPage />} />

                <Route path='/*' element={<Navigate to={'/'}/>}/>  
                </> 
            } 
            
        </Routes>
    )
}