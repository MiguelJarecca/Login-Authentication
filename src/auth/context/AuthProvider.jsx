import { UseAuth } from "../hooks/UseAuth"
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({children}) => {

    const { login, handleLogin, handleLogout } = UseAuth();

    return (
        <AuthContext.Provider value={
            {
                login,
                handleLogin,
                handleLogout,
            }
        }>
            {children}
        </AuthContext.Provider>

    )
}