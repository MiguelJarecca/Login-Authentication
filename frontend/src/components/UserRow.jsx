// import { NavLink } from "react-router-dom"
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UserRow = ({ id, username, email, admin }) => {
    const { handlerUserSelectedForm, handlerRemoveUser } = useUsers();
    const { login } = useAuth();
    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>

            <td>{admin ? 'Adm.' : 'Usr.'}</td>

            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            type="button"
                            className="button-update"
                            onClick={() => handlerUserSelectedForm({
                                id,
                                username,
                                email,
                                admin
                            })}
                        >
                            actualizar
                        </button>
                    </td>
                    {/* <td>
                        <NavLink className={'btn btn-secondary btn-sm'}
                            to={'/users/edit/' + id} >
                            update route
                        </NavLink>
                    </td> */}
                    <td>
                        <button
                            type="button"
                            className="button-delete"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            eliminar
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}