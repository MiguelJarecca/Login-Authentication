import { useContext, useEffect, useState } from "react";
// import Swal from "sweetalert2";
import { UseUsers } from "../hooks/UseUsers";

export const UserForm = ( {userSelect, handleCloseForm}) => {

    const {initialUserForm, handleAddUser, errors} = UseUsers();

    const [userForm, setUserForm] = useState(initialUserForm);
    const [checked, setChecked] = useState(userForm.admin);
    const {id, username, password, email, admin} = userForm;

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

    const onCheckboxChange = () => {
        setChecked(!checked);
        setUserForm({
            ...userForm,
            admin: checked,
        });
    }

    const onSubmitForm = (event) =>  {
        //Evita que se recargue la pagina cuando enviamos el form
        event.preventDefault();
        // if (!username || (!password && id === 0) || !email) {

        //     Swal.fire({
        //         title: "Error de validacion!",
        //         text: "Completar el formulario.",
        //         icon: "error"
        //       });
        //     return;
        // }

        handleAddUser(userForm);
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
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />
                <p>{errors?.username}</p>

                {id > 0 ? '' : <input 
                    type="password" 
                    placeholder="contraseña"
                    name="password"
                    value={password}
                    onChange={onInputChange}
                /> }
                <p>{errors?.password}</p>
                
                <input 
                    type="email" 
                    placeholder="correo electronico"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <p>{errors?.email}</p>

                <div>
                    <input type="checkbox"
                        name="admin" 
                        checked={admin}
                        onChange={onCheckboxChange}
                        />
                    <label>Admin</label>    
                </div>

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