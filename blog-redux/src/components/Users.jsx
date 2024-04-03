import { useEffect, useState } from 'react'
import userService from '../services/users'

const DetailsView = (users) => {
  return (
    <>
    added blogs

    </>
  )
}
const User = ({user}) => {
  return (
    <li> {user.username}  blog created {user.blogs.length}</li>
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
        { users.map(user => ( <User key={user.id} user={user} />) ) }
      </ul>
    </>
  )
}
export default Users
