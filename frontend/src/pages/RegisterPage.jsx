import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { UserForm } from "../components/UserForm"
import { useUsers } from "../hooks/useUsers";

export const RegisterPage = () => {

    const { users = [], initialUserForm } = useUsers();

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const user = users.find(u => u.id == id) || initialUserForm;
            setUserSelected(user);
        }
    }, [id])

    return (
        <div className="register-page-container">
            <h4 className="title">{ userSelected.id > 0 ? 'Editar' : 'Registrar'} usuario</h4>
            <UserForm userSelected={userSelected} />
        </div>
    )
}