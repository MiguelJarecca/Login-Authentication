import { useReducer } from "react";
import { LoginReducer } from "../reducers/LoginReducer";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth:false,
    isAdmin: false,
    user: undefined,
  };

export const UseAuth = () => {

  const [login, dispatch] = useReducer(LoginReducer, initialLogin);
  const navigate = useNavigate();

  const handleLogin = async({username, password}) => {


      try {
        const response = await AuthService({username, password});
        const token = response.data.token;
        console.log("mirando el token ", token);

        const claims = JSON.parse(window.atob(token.split(".")[1]));
        console.log("mirando los claims ", claims);

        const user = {username: response.data.username};

        dispatch({
          type:'login',
          payload: {user, isAdmin: claims.isAdmin},
        });

        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            isAdmin: claims.isAdmin,
            user: user,
        }));

        sessionStorage.setItem('token', `Bearer ${token}`)
        navigate('/users');

      }catch(error){

        if (error.response?.status == 401) {
          Swal.fire('Error login', 'username o password invalidos', 'error');
        } else if (error.response?.status == 403) {
          Swal.fire('Error login', 'no tiene acceso al recurso o permiso', 'error');
        } else {
          throw error;
        }
       
      }
    }

    const handleLogout = () => {
      dispatch({
        type:'logout',
      });
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('login');
      sessionStorage.clear();
    };

  return {
        login,
        handleLogin,
        handleLogout,
    }
  
}
