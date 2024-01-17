import { UserRow } from "./UserRow"

export const UserList = ({ users=[], handleDeleteUser, handleSelectUser }) => {

    return (
        <>
            <h2>Lista de usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>nombre</th>
                        <th>correo electronico</th>
                        <th>actualizar</th>
                        <th>actualizar ruta</th>
                        <th>eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow 
                            key = {user.id}
                            id = {user.id}
                            userName = {user.userName}
                            email = {user.email}
                            handleDeleteUser = {handleDeleteUser}
                            handleSelectUser= {handleSelectUser}
                        />
                    ))}
                   
                </tbody>

            </table>
        </>
    )    
}