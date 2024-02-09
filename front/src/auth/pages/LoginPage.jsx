import Swal from "sweetalert2";
import { UseAuth } from "../hooks/UseAuth";
import { useState } from "react";
import { NavBar } from "../../components/layout/NavBar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const {initialLogin} = useSelector(state => state.users);
    console.log('control del selector initial login ', initialLogin);

    const { handleLogin } = UseAuth();

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    // console.log('control del login ' ,loginForm);

    // setLoginForm(initialLogin);

    const { username, password } = loginForm;
    // const { username, password } = initialLogin;

    const onInputChange = ({ target }) => {
        const {name,value} = target;
        setLoginForm({
            ...loginForm,
            [ name ] : value
        })
    } 

    // const onInitialLogin = ({initialLogin}) => {
    //     const {name, value} = initialLogin;
    //     setLoginForm({
    //         ...loginForm,
    //         [name] : value
    //     })
    // }

    const onSubmit = async(event) => {
        event.preventDefault();

        
    if (!username || !password) {
        Swal.fire('Error de validacion', 'username y password requeridos', 'error');
        return; // Detiene la ejecución si hay un error
    }

    try {
        // Espera a que la operación de inicio de sesión sea completada
        await handleLogin({ username, password });

        // Limpia el formulario restableciendo el estado de `loginForm` a su valor inicial
        setLoginForm(initialLoginForm);

        // Redirige al usuario o muestra una notificación de éxito, según sea necesario
    } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante el inicio de sesión
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