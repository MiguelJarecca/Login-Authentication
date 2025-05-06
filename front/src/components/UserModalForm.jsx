import { UserForm } from "./UserForm";
import { useUsers } from "../hooks/useUsers";

export const UserModalForm = () => {
    
    const { userSelected, handlerCloseForm } = useUsers();
    
    return (
        <div className="modal">
            <div className="modal-content">
                <h5 className="modal-title">
                    {userSelected.id > 0 ? 'Editar' : 'Crear'} Modal Usuarios
                </h5>

                <div className="modal-body">
                    <UserForm 
                        userSelected={userSelected}
                        handlerCloseForm={handlerCloseForm}
                    />
                </div>
            </div>
        </div>
    );
}