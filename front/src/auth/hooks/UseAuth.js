import { useReducer } from "react";
import { LoginReducer } from "../reducers/LoginReducer";
import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth:false,
    user: undefined,
  };

export const UseAuth = () => {

  const [login, dispatch] = useReducer(LoginReducer, initialLogin);
  const navigate = useNavigate();

  const handleLogin = async({username, password}) => {


      try {
        const response = await AuthService({username, password});
        const token = response.data.token;

        const user = {username: response.data.username};
        dispatch({
          type:'login',
          payload: user,
        });

        sessionStorage.setItem('login', JSON.stringify({
            isAuth: true,
            user: user,
        }));

        navigate('/users');

      }catch(error){
        Swal.fire('Error login', 'username o password invalidos', 'error');
      }
    }

    const handleLogout = () => {
      dispatch({
        type:'logout',
      });

      sessionStorage.removeItem('login');
    };

  return {
        login,
        handleLogin,
        handleLogout,
    }
  
}
