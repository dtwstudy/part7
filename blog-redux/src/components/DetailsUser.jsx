import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DetailsView = () => {
  const params = useParams().id
  const blogs = useSelector((state) => {
    return state.blogs.filter((blog) => blog.user.id === params)
  })
  const content = blogs.map((blog) => <li key={blog.id}> <h3>{blog.title } </h3> </li>)
  if (!content) return null
  return (
    <>
      <p>added blogs</p>
      <ul>{content}</ul>
    </>
  )
}
export default DetailsView
