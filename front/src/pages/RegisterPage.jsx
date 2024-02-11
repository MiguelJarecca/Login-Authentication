import { useEffect, useState } from "react"
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { UseUsers } from "../hooks/UseUsers";
import { NavBar } from "../components/layout/NavBar";

export const RegisterPage = () => {

    const {users, initialUserForm} = UseUsers();

    const [userSelect, setUserSelect] = useState(initialUserForm);

    const {id} = useParams();

    useEffect(()=>{
      if (id) {
        const user = users.find(u => u.id == id) || initialUserForm;
        setUserSelect(user);
      }
    },[id]);

    return (
      <>
        {/* {userSelect.id > 0 || <NavBar />} */}
        
          <div className="container-form">
          <h3>{userSelect.id > 0 ? 'Editar' : 'Registrar'} Usuario</h3>

          <UserForm 
          userSelect={userSelect} />
        </div>
      </>

  )
}

