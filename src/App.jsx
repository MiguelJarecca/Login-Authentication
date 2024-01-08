import { useReducer } from 'react';
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
        userName: '',
        password: '',
        email: '',
    }

function App() {

  const [users, dispach] = useReducer(UsersReducer, initialUsers);

  const handleAddUser = (user) => {
    dispach({
      type: 'addUser',
      payload: user,
    })
  };

  const handleDeleteUser = (id) => {
    dispach({
      type: 'deleteUser',
      payload: id,
    })
  };

  return (
    <section>
      <h1>APP</h1>

      <div className="container">
           
        <UserForm 
          handleAddUser={handleAddUser}
          initialUserForm={initialUserForm}
        />

        {users && users.length === 0
          ? <div> No hay usuarios en el sistema!</div>
          : <UserList 
            users={users}
            handleDeleteUser={handleDeleteUser}
            /> 
        }

      </div>
    </section>
  )
}

export default App
