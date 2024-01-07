import './App.css'
import { UserForm } from './components/UserForm'
import { UserList } from './components/UsersList'

function App() {

  const initialUsers = [
    {
      id: 1,
      userName: 'miguel',
      password: 123456,
      email: 'user1@gmail.com',
    }  
  ];

  return (
    <>
      <h1>APP</h1>

      <div className="container">
        <UserForm />
        <UserList />
      </div>
    </>
  )
}

export default App
