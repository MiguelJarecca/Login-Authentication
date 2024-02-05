import { useEffect } from "react";
import { UserForm } from "../components/UserForm";
import { UserList } from "../components/UsersList";
import { UseUsers } from "../hooks/UseUsers";
import { UseAuth } from "../auth/hooks/UseAuth";

export const UsersPage = () => {

  const {
    users,
    userSelect,
    visibleForm,
    handleDeleteUser,
    handleSelectUser,
    handleOpenForm,
    handleCloseForm,
    getUsers,
    } = UseUsers();
 
    const { login } = UseAuth();

    useEffect(() => {
      getUsers();
    },[]);  
    
      return (
        <section>
          <h1>APP</h1>
    
          <div className="container">
            {!visibleForm || <UserForm 
              userSelect={userSelect}
              handleCloseForm={handleCloseForm}
            />}   
            
            {(visibleForm || !login.isAdmin) || <button
              onClick={handleOpenForm}>
              Nuevo usuario
              </button> }
            
            {users.length === 0
              ? <div> No hay usuarios en el sistema!</div>
              : <UserList 
                users={users}
                handleDeleteUser={handleDeleteUser}
                handleSelectUser={handleSelectUser}
                /> 
            }
    
          </div>
        </section>
      )
}