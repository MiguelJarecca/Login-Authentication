import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../hooks/useAuth";

const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {

    const { handlerLogin } = useAuth();
    
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }

        // aca implementamos el login
        handlerLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
        <div className="login-container">
            <h5 className="login-title">Inicia Sesión</h5>

            <form className="login-form" onSubmit={ onSubmit }>
                <input
                    className="login-input"
                    placeholder="Nombre:"
                    name="username"
                    value={username}
                    onChange={ onInputChange }
                />
                            
                <input
                    className="login-input"
                    placeholder="Contraseña:"
                    type="password"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                />
                <button
                    className="btn"
                    type="submit">
                    Iniciar
                </button>
            </form>
        </div>
    );

}