import { UserRow } from "./UserRow"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersList = () => {

    const { users } = useUsers();
    const { login } = useAuth();

    return (
        <table className="table">

            <thead>
                <tr>
                    <th>id</th>
                    <th>nombre</th>
                    <th>correo electrónico</th>
                    <th>rol</th>

                    {!login.isAdmin || <>
                        <th>actualizar</th>
                        {/* <th>update route</th> */}
                        <th>eliminar</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}