import { useReducer, useState } from "react";
import { UsersReducer } from "../reducers/UsersReducer";
import Swal from "sweetalert2";

const initialUsers = [
    {
      id: 1,
      userName: 'miguel',
      password: 123456,
      email: 'user1@gmail.com',
    }  
  ];
  
  const initialUserForm = 
      {
          id: 0,
          userName: '',
          password: '',
          email: '',
      }
  
export const UseUsers = () => {

    const [users, dispach] = useReducer(UsersReducer, initialUsers);
    const [userSelect, setUserSelect] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const handleAddUser = (user) => {
  
      let type;
  
        if (user.id === 0) {
          type='addUser'
        } else {
          
          type='updateUser'
        }
  
      dispach({
        type: type,
        payload: user,
      });

      Swal.fire({
        title: (user.id === 0) 
            ? "Usuario Creado"
            : "Usuario Actualizado",
        text: (user.id === 0)
            ? "El usuario ha sido creado con exito!"
            : "El usuario ha sido actualizado con exito",
        icon: "success"
      });

      setVisibleForm(false);
      setUserSelect(initialUserForm);
    };
  
    const handleDeleteUser = (id) => {

      Swal.fire({
        title: "Estas seguro que deseas eliminar?",
        text: "Cuidado el usuario sera eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {

            dispach({
                type: 'deleteUser',
                payload: id,
              });

          Swal.fire({
            title: "Eliminar!",
            text: "El usuario ha sido eliminado con exito.",
            icon: "success"
          });
        }
      });
    };
  
    const handleSelectUser = (user) => {
        setVisibleForm(true);
      //creamos un clon de user con el ...
      setUserSelect({...user});
    }

    const handleOpenForm = () => {
        setVisibleForm(true);
    }

    const handleCloseForm = () => {
        setVisibleForm(false);
        setUserSelect(initialUserForm);
    }

    return (
        {
            users,
            userSelect,
            initialUserForm,
            visibleForm,

            handleAddUser,
            handleDeleteUser,
            handleSelectUser,
            handleOpenForm,
            handleCloseForm
        }
    )
} 