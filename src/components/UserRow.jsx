
export const UserRow = ({ handleDeleteUser, handleSelectUser, id, userName, email, password }) => {

    const onDeleteUser = (id) => {
        handleDeleteUser(id);
    }

    const onSelectetUser = (user) => {
        handleSelectUser(user);
    }

    return (
        
             <tr>
                <td>{id}</td>
                <td>{userName}</td>
                <td>{email}</td>
                <td>
                    <button
                        type="button"
                        onClick={() => onSelectetUser({id, userName, email, password})}
                        >
                        Actualizar    
                    </button>
                </td>
                <td>
                    <button 
                        type="button"
                        onClick={() => onDeleteUser(id)}
                        >
                        Eliminar
                    </button>

                    
                </td>
            </tr>
        
    );
};