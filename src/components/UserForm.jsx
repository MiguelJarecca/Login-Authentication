import { useState } from "react";

const initialUserForm = 
    {
        userName: '',
        password: '',
        email: '',
    }


export const UserForm = () => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const {userName, password, email} = userForm;

    const onInputChange = ({target}) => {
        const {name, value} = target;
            setUserForm({
                ...userForm,
                [name]: value,
            })
    }

    return (
        <div className="container-form">
            <h2>Formulario de Usuario</h2>

            <form className="form">
                <input 
                    type="text" 
                    placeholder="nombre"
                    name="userName"
                    value={userName}
                    onChange={onInputChange}
                />
                <input 
                    type="password" 
                    placeholder="contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                />
                <input 
                    type="email" 
                    placeholder="correo electronico"
                    name="value"
                    value={email}
                    onChange={onInputChange}
                />
                <button type="submit"> Crear Usuario</button>
            </form>
        </div>
    )    
}