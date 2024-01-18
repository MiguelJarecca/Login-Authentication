import './App.css'

import { LoginPage } from './auth/pages/LoginPage'

import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoute } from './routes/UserRoute';
import { useContext } from 'react';
import { AuthContext } from './auth/context/AuthContext';

function App() {

  const { login } = useContext(AuthContext);

  return (
    <Routes>
      {login.isAuth
        ? (
            <Route path='/*' element={<UserRoute />}/>
          ) 
        : <>
            <Route path='/login' element={<LoginPage />}/>

            <Route path='/*' element={<Navigate to={'/login'}/>}/>  
          </> 
        
        }
       
    </Routes>
  )
}

export default App
