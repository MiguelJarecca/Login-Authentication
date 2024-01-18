import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const { handleLogin } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState(initialLoginForm);

    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const {name,value} = target;
        setLoginForm({
            ...loginForm,
            [ name ] : value
        })
    } 

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || !password) {
            Swal.fire('Error de validacion', 'username y password requeridos', 'error');
        }

        //aca implementamos el login
        handleLogin({username, password});

    }

    return(

        <div className="container-login">
            <h3>Inicia Sesion</h3>

            <form onSubmit={onSubmit}>
                <input 
                    type="text"
                    placeholder="nombre:"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                    />

                <input 
                    type="text"
                    placeholder="contraseña:"
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

    )
};