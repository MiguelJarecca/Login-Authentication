import { useEffect, useState } from "react";

export const UserForm = ( { initialUserForm, handleAddUser, userSelect}) => {

    const [userForm, setUserForm] = useState(initialUserForm);
    const {id, userName, password, email} = userForm;

    useEffect (() => {
        setUserForm({...userSelect});
    },[userSelect]);

    const onInputChange = ({target}) => {
        const {name, value} = target;
            setUserForm({
                ...userForm,
                [name]: value,
            })
    }

    const onSubmitForm = (event) =>  {
        //Evita que se recargue la pagina cuando enviamos el form
        event.preventDefault();
        if (!userName || !password || !email) {
            alert('Completar el formulario');
            return;
        }

        handleAddUser(userForm);

        //Cuando enviamos los datos limpiamos los valores
        setUserForm(initialUserForm);
    }

    return (
        <div className="container-form">
            <h2>Formulario de Usuario</h2>

            <form className="form" onSubmit={onSubmitForm}>
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
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <input
                    type="hidden"
                    name="id"
                    value={id}
                />

                <button 
                type="submit"
                > 
                {id > 0 ? 'Actualizar Usuario' : 'Crear Usuario' }</button>
            </form>
        </div>
    )    
}