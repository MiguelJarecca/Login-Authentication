import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const Navbar = () => {

    const { login, handlerLogout } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <a className="navbar-brand" href="/users">UsersApp</a>

                <div className="navbar-link">
                    {!login.isAdmin ||
                        <NavLink to="/users/register">
                            Registrar Usuario
                        </NavLink>
                    }
                </div>
            </div>
                
            <div className="navbar-right">
                <span className="navbar-username">
                    {login.user?.username}
                </span>
                <button
                    onClick={handlerLogout}
                    className="logout-btn">
                    Logout
                </button>
            </div>
        </nav>
    );
}