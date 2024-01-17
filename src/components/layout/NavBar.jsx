import { NavLink } from "react-router-dom"

export const NavBar = ({login, handleLogout}) => {



  return (
    <div>

      <ul>
        <li>
            <NavLink to="/users"> Usuarios</NavLink>
            <NavLink to="/users/register"> Crear Usuario</NavLink>
        </li>
      </ul>

      <div>hola soy {login.user?.username}</div>

        <button 
            type="submit"
            onClick={handleLogout}
            >
            Cerrar Sesion
        </button>
    </div>
  )
}
