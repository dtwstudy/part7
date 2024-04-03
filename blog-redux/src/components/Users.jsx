import { useEffect, useState } from 'react'
import userService from '../services/users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const User = ({ user }) => {
  return (
    <li>
      {' '}
      <Link to={`/view/${user.id}`}>{user.username}</Link> blog created {user.blogs.length}
    </li>
  )
}
const Users = () => {
  const [users, setUser] = useState([])
  useEffect(() => {
    userService.getUsers().then((data) => {
      setUser(data)
    })
  }, [])

  return (
    <>
      <ul>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </ul>
    </>
  )
}
export default Users
