
export const UserRow = ({ handleDeleteUser, id, userName, email }) => {

    const onDeleteUser = (id) => {
        handleDeleteUser(id);
    }

    return (
        
             <tr>
                <td>{id}</td>
                <td>{userName}</td>
                <td>{email}</td>
                <td><button type="button">Actualizar</button></td>
                <td>
                    <button 
                        type="button"
                        onClick={() => onDeleteUser(id)}
                        >
                        eliminar
                    </button>
                </td>
            </tr>
        
    );
};