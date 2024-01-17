import { UserForm } from "../components/UserForm";
import { UserList } from "../components/UsersList";

export const UserPage = ({
    users,
    userSelect,
    initialUserForm,
    visibleForm,

    handleAddUser,
    handleDeleteUser,
    handleSelectUser,
    handleOpenForm,
    handleCloseForm

    }) => {
    
      return (
        <section>
          <h1>APP</h1>
    
          <div className="container">
            {!visibleForm || <UserForm 
              handleAddUser={handleAddUser}
              initialUserForm={initialUserForm}
              userSelect={userSelect}
              handleCloseForm={handleCloseForm}
            />}   
            
            {visibleForm || <button
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