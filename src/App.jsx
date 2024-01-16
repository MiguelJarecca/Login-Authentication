import './App.css'

import { LoginPage } from './auth/pages/LoginPage'
import { UserPage } from './pages/UsersPage';

import { NavBar } from './components/layout/NavBar';
import { UseAuth } from './auth/hooks/UseAuth';

function App() {

  const { login, handleLogin, handleLogout } = UseAuth();

  return (
    <>
      {login.isAuth
        ? (
            <> 
              <UserPage />
              <NavBar login={login} handleLogout={handleLogout}/>
            </>
          ) 
        : <LoginPage handleLogin={handleLogin}/>}
       
    </>
  )
}

export default App
