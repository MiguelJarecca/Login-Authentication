import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { UserRow } from "./UserRow"

export const UserList = ({ users=[], handleDeleteUser, handleSelectUser }) => {

    const { login } = useContext(AuthContext);

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
                            <th>actualizar</th>
                            <th>actualizar ruta</th>
                            <th>eliminar</th>
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
                            handleDeleteUser = {handleDeleteUser}
                            handleSelectUser= {handleSelectUser}
                        />
                    ))}
                   
                </tbody>

            </table>
        </div>
    )    
}