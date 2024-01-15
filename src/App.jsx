import { useReducer, useState } from 'react';
import './App.css'
import { UserForm } from './components/UserForm'
import { UserList } from './components/UsersList'
import { UsersReducer } from './reducers/UsersReducer';

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

function App() {

  const [users, dispach] = useReducer(UsersReducer, initialUsers);
  const [userSelect, setUserSelect] = useState(initialUserForm);

  console.log('control update', users)
  const handleAddUser = (user) => {

  console.log('control user modificado', user)

    let type;

      if (user.id === 0) {
        type='addUser'
      } else {
        
        type='updateUser'
      }

    dispach({
      type: type,
      payload: user,
    })
  };

  const handleDeleteUser = (id) => {
    dispach({
      type: 'deleteUser',
      payload: id,
    })
  };

  const handleSelectUser = (user) => {
    //creamos un clon de user con el ...
    setUserSelect({...user});
  }

  return (
    <section>
      <h1>APP</h1>

      <div className="container">
           
        <UserForm 
          handleAddUser={handleAddUser}
          initialUserForm={initialUserForm}
          userSelect={userSelect}
        />

        {users.length === 0
          ? <div> No hay usuarios en el sistema!</div>
          : <UserList 
            users={users}
            handleDeleteUser={handleDeleteUser}
            handleSelectUser={handleSelectUser}
            /> 
        }

      </div>
    </section>
  )
}

export default App
