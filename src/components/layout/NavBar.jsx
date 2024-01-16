
export const NavBar = ({login, handleLogout}) => {



  return (
    <div>
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
