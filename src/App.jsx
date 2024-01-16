import './App.css'

import { useReducer } from 'react'
import { LoginPage } from './auth/pages/LoginPage'
import { LoginReducer } from './auth/pages/reducers/LoginReducer'
import { UserPage } from './pages/UsersPage';

import Swal from 'sweetalert2';


const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
  isAuth:false,
  user: undefined,
};

function App() {

  const [login, dispach] = useReducer(LoginReducer, initialLogin);

  const handleLogin = ({username, password}) => {

      if (username === 'admin' && password === '123456') {

        const user = {username:'admin'};
        dispach({
          type:'login',
          payload: user,
        });

        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user: user,
        }));

      }else{
        Swal.fire('Error login', 'username o password invalidos', 'error');
      }
    }

  return (
    <>
      {login.isAuth
        ? <UserPage /> 
        : <LoginPage handleLogin={handleLogin}/>}
       
    </>
  )
}

export default App
