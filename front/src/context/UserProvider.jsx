import { UseUsers } from "../hooks/UseUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

    const {
        users,
        userSelect,
        initialUserForm,
        visibleForm,
        errors,
    
        handleAddUser,
        handleDeleteUser,
        handleSelectUser,
        handleOpenForm,
        handleCloseForm,
        getUsers,
    
       } = UseUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelect,
                initialUserForm,
                visibleForm,
                errors,
            
                handleAddUser,
                handleDeleteUser,
                handleSelectUser,
                handleOpenForm,
                handleCloseForm,
                getUsers,
            }
        }>
            {children}
        </UserContext.Provider>    
    )

}