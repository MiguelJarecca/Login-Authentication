import { NavLink } from "react-router-dom"
import { UseAuth } from "../../auth/hooks/UseAuth";

export const NavBar = () => {

  const { login, handleLogout } = UseAuth();

  return (
    <div className="nav-bar">

      <ul>
        <li>
            <NavLink to="/users"> Usuarios</NavLink>
            {!login.isAdmin || <NavLink to="/users/register"> Crear usuario</NavLink>}
        </li>
      </ul>

      <div>
        <h3>Hola {login.user?.username}</h3>

          <button 
            type="submit"
            onClick={handleLogout}
            >
            Cerrar sesion
          </button>
      </div>
    </div>
  )
}
