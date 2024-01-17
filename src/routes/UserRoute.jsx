import { Navigate, Route, Routes } from "react-router-dom"
import { UserPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"
import { UseUsers } from "../hooks/UseUsers"

export const  UserRoute = ({ login, handleLogout }) => {

    const {
        users,
        userSelect,
        initialUserForm,
        visibleForm,
    
        handleAddUser,
        handleDeleteUser,
        handleSelectUser,
        handleOpenForm,
        handleCloseForm
    
       } = UseUsers();

    return (
        <>
            <NavBar login={login} handleLogout={handleLogout}/> 

            <Routes>
                <Route path="users" element={<UserPage 
                      users={users}
                      userSelect={userSelect}
                      initialUserForm={initialUserForm}
                      visibleForm={visibleForm}
                  
                      handleAddUser={handleAddUser}
                      handleDeleteUser={handleDeleteUser}
                      handleSelectUser={handleSelectUser}
                      handleOpenForm={handleOpenForm}
                      handleCloseForm={handleCloseForm}
                />} />

                <Route path="users/register" element={<RegisterPage 
                    handleAddUser={handleAddUser}
                    initialUserForm={initialUserForm}/>} />
                <Route path="/" element={<Navigate to="/users"/>} />
            </Routes>
        </>
    )
}