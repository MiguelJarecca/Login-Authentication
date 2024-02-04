import { useContext, useReducer, useState } from "react";
import { UsersReducer } from "../reducers/UsersReducer";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { findAll, remove, save, update } from "../services/UserService";
import { AuthContext } from './../auth/context/AuthContext';

const initialUsers = [];
  
  const initialUserForm = 
      {
          id: 0,
          username: '',
          password: '',
          email: '',
          admin: false,
      }
  const initialErrors = 
      {
          username: '',
          password: '',
          email: '',
      }      
  
export const UseUsers = () => {

    const [users, dispach] = useReducer(UsersReducer, initialUsers);
    const [userSelect, setUserSelect] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const [errors, setErrors] = useState(initialErrors);
    const navigate = useNavigate();

    const { login, handleLogout } = useContext(AuthContext);

    //comunicacion con el userService-backend-traer todos los usarios
    const getUsers = async() => {

      const result = await findAll();

      dispach({
        type: 'loadingUsers',
        payload: result.data
      });

    };

    //comunicacion con el userService-backend-guardar o actualizar usuario
    const handleAddUser = async(user) => {

      //opcional
      if (!login.isAdmin) return;
        
      let type;
      let response;

      try {

        if (user.id === 0) {
          response = await save(user);
        } else {
          response = await update(user);
        }
    
          if (user.id === 0) {
            type='addUser'
          } else {
            type='updateUser'
          }
    
        dispach({
          type: type,
          payload: response.data,
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
        navigate('/users');

      } catch (error) {
          if (error.response && error.response.status == 400) {
            setErrors(error.response.data);

          } else if (error.response && error.response.status == 500) {

              if (error.response.data?.message?.includes('UK_username')) {
                setErrors({username: 'El username ya existe'});
              }

              if (error.response.data?.message?.includes('UK_email')) {
                setErrors({email: 'El email ya existe'});
              } 
          } else if (error.response?.status == 401) {
            //es para cerrar sesion
            handleLogout();
          } else {
            throw error;
          }
      }
    };
  
    //comunicacion con el userService-backend-eliminar usuario
    const handleDeleteUser = (id) => {

      //Si no es Admin el user regresara con el return
      if (!login.isAdmin) return;

      Swal.fire({
        title: "Estas seguro que deseas eliminar?",
        text: "Cuidado el usuario sera eliminado!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar!"

      }).then(async(result) => {

        if (result.isConfirmed) {

          try {
            await remove(id);

            dispach({
                type: 'deleteUser',
                payload: id,
              });

            Swal.fire({
              title: "Eliminar!",
              text: "El usuario ha sido eliminado con exito.",
              icon: "success"
            });
        
          } catch (error) {
            if (error.response?.status == 401) {
              handleLogout();
            }
          }
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
        //Limpiamos los errores de errors
        setErrors({});
    }

    return (
        {
            users,
            userSelect,
            initialUserForm,
            visibleForm,
            errors,

            handleAddUser,
            handleDeleteUser,
            handleSelectUser,
            handleOpenForm,
            handleCloseForm,
            getUsers,
        }
    )
} 