import { useEffect, useState } from "react"
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";

export const RegisterPage = ({users, handleAddUser, initialUserForm}) => {

    const [userSelect, setUserSelect] = useState(initialUserForm);

    const {id} = useParams();

    useEffect(()=>{
      if (id) {
        const user = users.find(u => u.id == id) || initialUserForm;
        setUserSelect(user);
      }
    },[id]);

    return (
    <div className="container-form">
      <h3>{userSelect.id > 0 ? 'Editar' : 'Registrar'} Usuario</h3>

      <UserForm 
        userSelect={userSelect}
        handleAddUser={handleAddUser}
        initialUserForm={initialUserForm}/>
    </div>
  )
}

