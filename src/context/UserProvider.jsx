import { UseUsers } from "../hooks/UseUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

    const {
        users,
        userSelect,
        initialUserForm,
        visibleForm,
    
        handleAddUser,
        handleDeleteUser,
        handleSelectUser,
        handleOpenForm,
        handleCloseForm,
    
       } = UseUsers();

    return (
        <UserContext.Provider value={
            {
                users,
                userSelect,
                initialUserForm,
                visibleForm,
            
                handleAddUser,
                handleDeleteUser,
                handleSelectUser,
                handleOpenForm,
                handleCloseForm,
            }
        }>
            {children}
        </UserContext.Provider>    
    )

}