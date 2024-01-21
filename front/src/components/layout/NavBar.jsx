import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../auth/context/AuthContext"

export const NavBar = () => {

  const { login, handleLogout } = useContext(AuthContext);

  return (
    <div className="nav-bar">

      <ul>
        <li>
            <NavLink to="/users"> Usuarios</NavLink>
            <NavLink to="/users/register"> Crear usuario</NavLink>
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
