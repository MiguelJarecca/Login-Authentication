import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPage } from "../pages/UsersPage"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPage } from "../pages/RegisterPage"
import { UserProvider } from "../context/UserProvider"
import { useContext } from "react"
import { AuthContext } from "../auth/context/AuthContext"

export const  UserRoute = () => {

    const { login } = useContext(AuthContext);

    return (
        <>
            <UserProvider>
                <NavBar /> 

                <Routes>
                    <Route path="users" element={<UsersPage />} />

                    {!login.isAdmin || <>
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users/update/:id" element={<RegisterPage />} />
                    </>}
                    
                    <Route path="/" element={<Navigate to="/users"/>} />

                </Routes>
            </UserProvider>
        </>
    )
}