import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ( {userSelect, handleCloseForm}) => {

    const {initialUserForm, handleAddUser} = useContext(UserContext);

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
        if (!userName || (!password && id === 0) || !email) {

            Swal.fire({
                title: "Error de validacion!",
                text: "Completar el formulario.",
                icon: "error"
              });
            return;
        }

        handleAddUser(userForm);

        //Cuando enviamos los datos limpiamos los valores
        setUserForm(initialUserForm);
    }

    const onCloseForm = () => {
        handleCloseForm();
        setUserForm(initialUserForm);
    }

    return (
        <div>
            <form className="form" onSubmit={onSubmitForm}>
                <input 
                    type="text" 
                    placeholder="nombre"
                    name="userName"
                    value={userName}
                    onChange={onInputChange}
                />
                {id > 0 ? '' : <input 
                    type="password" 
                    placeholder="contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                /> }
                
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

                {!handleCloseForm || <button
                    type="button"
                    onClick={() => onCloseForm()}>
                    Cerrar
                </button>}
                
            </form>
        </div>
    )    
}