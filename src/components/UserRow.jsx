
export const UserRow = ({ id, userName, email }) => {

    return (
        <>
             <tr>
                <td>{id}</td>
                <td>{userName}</td>
                <td>{email}</td>
                <td><button type="button">actualizar</button></td>
                <td><button type="button">eliminar</button></td>
            </tr>
        </>
    )
}