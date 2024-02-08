import { NavBar } from "./layout/NavBar"

export const Home = () => {


    return(
        <div className="section-home">
            <NavBar />
                <div className="section-home-title">
                    <h2>Bienvenido!</h2>    
                    <p>Hola soy Miguel, esta es una aplicacion donde aplique mis 
                        conocimientos.
                    </p>
                </div>
                <div className="section-home-intro">
                    <p>En esta aplicacion estoy usando React para el front y Spring Boot
                    con java para el back, además para la seguridad se uso 
                    Spring Security 6 con Jwt.
                    </p>
                </div>
                <div className="section-home-body">
                    <ul>
                        <li>
                            <p>Si desea ingresar registrese e inicie sesion</p>
                        </li>
                        <li>
                            <p>Si prefiere puede usar este 
                                usuario: <strong>usuario</strong> password: <strong>12345</strong></p>
                        </li>
                        <li>
                            <p>Si desea tambien puede ingresar como admistrador
                                usuario: <strong>admin</strong> password: <strong>12345</strong>
                            </p>
                        </li>
                        <li>
                            <p>Si ingresa como administrador tendra en control de toda
                                la pagina, podrás: crear, leer, actualizar e eliminar
                                cualquier usuario. 
                            </p>
                        </li>
                    </ul>
                </div>
        </div>
    )
} 