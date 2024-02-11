import { UserRow } from "./UserRow"
import { UseAuth } from "../auth/hooks/UseAuth";

export const UserList = ({ users=[], handleDeleteUser, handleSelectUser }) => {

    const { login } = UseAuth();

    return (
        <div className="container-table">
            <h2>Lista de usuarios</h2>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>nombre</th>
                        <th>correo electronico</th>
                        {!login.isAdmin || <>
                            {/* <th>actualizar</th> */}
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                            <th>Rol</th>
                    
                        </>}
                       
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow 
                            key = {user.id}
                            id = {user.id}
                            username = {user.username}
                            email = {user.email}
                            admin = {user.admin}
                            rol = {user.admin}
                            handleDeleteUser = {handleDeleteUser}
                            handleSelectUser= {handleSelectUser}
                        />
                    ))}
                   
                </tbody>

            </table>
        </div>
    )    
}