import './App.css'

import { LoginPage } from './auth/pages/LoginPage'

import { UseAuth } from './auth/hooks/UseAuth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserRoute } from './routes/UserRoute';

function App() {

  const { login, handleLogin, handleLogout } = UseAuth();

  return (
    <Routes>
      {login.isAuth
        ? (
            <Route path='/*' element={<UserRoute
              login={login}
              handleLogout={handleLogout}/>}/>
          ) 
        : <>
            <Route path='/login'
              element={<LoginPage handleLogin={handleLogin}/>}/>

            <Route path='/*' element={<Navigate to={'/login'}/>}/>  
          </> 
        
        }
       
    </Routes>
  )
}

export default App
