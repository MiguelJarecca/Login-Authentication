import { NavLink } from "react-router-dom";
import { UseAuth } from "../auth/hooks/UseAuth";

export const UserRow = ({ handleDeleteUser, handleSelectUser, id, username, email, admin }) => {

    const { login } = UseAuth();

    const onDeleteUser = (id) => {
        handleDeleteUser(id);
    }

    const onSelectetUser = (user) => {
        handleSelectUser(user);
    }

    return (
        
             <tr>
                <td>{id}</td>
                <td>{username}</td>
                <td>{email}</td>
                {!login.isAdmin || <>
                    <td>
                    <button
                        className="button-update"
                        type="button"
                        onClick={() => onSelectetUser({id, username, email, admin})}
                        >
                        Actualizar    
                    </button>
                    </td>
                    <td>
                        <NavLink to={'/users/update/' + id}>
                            actualizar ruta
                        </NavLink>
                    </td>
                    <td>
                        <button 
                            className="button-delete"
                            type="button"
                            onClick={() => onDeleteUser(id)}
                            >
                            Eliminar
                        </button>
                    </td>
                </>}
  
            </tr>
    );
};