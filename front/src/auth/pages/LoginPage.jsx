import Swal from "sweetalert2";
import { UseAuth } from "../hooks/UseAuth";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/layout/NavBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const {initialLogin} = useSelector(state => state.users);

    const { handleLogin } = UseAuth();

    const [loginForm, setLoginForm] = useState(initialLoginForm);
  
    const { username, password } = loginForm;

    useEffect(() => {
        // Verifica si initialLogin contiene datos para rellenar
        if (initialLogin?.username && initialLogin?.password) {
            setLoginForm({
                username: initialLogin.username,
                password: initialLogin.password,
            });
        }
    }, [initialLogin]); // Este efecto se ejecutará cada vez que `initialLogin` cambie.


    const onInputChange = ({ target }) => {
        const {name,value} = target;
        setLoginForm({
            ...loginForm,
            [ name ] : value
        })
    } 

    const onSubmit = async(event) => {
        event.preventDefault();

            
        if (!username || !password) {
            Swal.fire('Error de validacion', 'username y password requeridos', 'error');
            return;
        }

        try {
            // Espera a que la operación de inicio de sesión sea completada
            await handleLogin({ username, password });

            // Limpia el formulario restableciendo el estado de `loginForm` a su valor inicial
            setLoginForm(initialLoginForm);

        } catch (error) {
            Swal.fire('Error de inicio de sesión', 'No se pudo iniciar sesión, intenta de nuevo.', 'error');
        }
    };
    return(
        <>
            <NavBar />
            <div className="section-login">
                <div className="container-login">
                    <h3>Inicia Sesión</h3>

                    <form onSubmit={onSubmit}>
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name="username"
                            value={username}
                            onChange={onInputChange}
                            />

                        <label>Contraseña:</label>
                        <input 
                            type="text"
                            name="password"
                            value={password}
                            onChange={onInputChange}
                            />  

                        <button
                            type="submit"
                            >
                            Iniciar
                        </button>      
                    </form>
                </div>
                <div className="container-register">
                    <h3>Bienvenido!</h3>
                    <p>Si aún no tienes una cuenta registrada lo puedes hacer aqui!</p>

                    <NavLink to="/users/register"> Registrate</NavLink>

                </div>
            </div>
        </>
    )
};