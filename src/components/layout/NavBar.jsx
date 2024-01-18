import { NavLink } from "react-router-dom"

export const NavBar = ({login, handleLogout}) => {



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
