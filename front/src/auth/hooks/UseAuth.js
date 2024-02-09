import { AuthService } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { onLogin, onLogout } from "../../store/slices/auth/authSlice";
import { useDispatch, useSelector } from 'react-redux';

export const UseAuth = () => {

  // const [login, dispatch] = useReducer(LoginReducer, initialLogin);
  const dispatch = useDispatch();
  const {user, isAdmin, isAuth} = useSelector(state => state.auth);

  const navigate = useNavigate();

  const handleLogin = async({username, password}) => {


      try {
        const response = await AuthService({username, password});
        const token = response.data.token;
        // console.log("mirando el token ", token);

        const claims = JSON.parse(window.atob(token.split(".")[1]));
        // console.log("mirando los claims ", claims);

        const user = {username: response.data.username};

        dispatch(onLogin({user, isAdmin: claims.isAdmin}));

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
      dispatch(onLogout());

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('login');
      sessionStorage.clear();

      navigate('/');
    };

  return {
        login: {
          user,
          isAdmin,
          isAuth,
        },
        handleLogin,
        handleLogout,
    }
  
}
