import { useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);
    
    return (
        <>

            {!visibleForm || <UserModalForm />}

            <div className="users-page-container">
                <div className="users-page-actions">
                    {(visibleForm || !login.isAdmin) || <button
                        className="actions-btn"
                        onClick={handlerOpenForm}>
                        Nuevo usuario
                    </button>}
                </div>
                
                <div className="users-page-content">
                    {
                        users.length === 0
                            ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                            : <UsersList />
                    }
                </div>
            </div>
        </>
    );
}