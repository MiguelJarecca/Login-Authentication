import { useState } from "react"
import { UserForm } from "../components/UserForm";

export const RegisterPage = ({handleAddUser, initialUserForm}) => {

    const [userSelect, setUserSelect] = useState(initialUserForm);

  return (
    <div>
      <h4>Registro de Uusario</h4>

      <UserForm 
        userSelect={userSelect}
        handleAddUser={handleAddUser}
        initialUserForm={initialUserForm}/>
    </div>
  )
}

