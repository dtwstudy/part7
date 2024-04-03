import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { loadsBlogs, addBlog , updateLike ,removeBlog ,setBlog } from './reducers/blogReducer'
import { loginIn, loginOut ,setUser } from './reducers/userReducer'
import Users from './components/Users'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.users)
  const [message, setMessageAlert] = useState({
    text: '',
    color: '',
    status: false,
  })
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()
  const [sortFlag, setFlag] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadsBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

  const showMessage = (text, color) => {
    setMessageAlert({ text: text, color: color, status: true })

    if (message.status) {
      setTimeout(() => {
        setMessageAlert({ text: '', color: '', status: false })
      }, 5000)
    }
  }

  const handleLogin = async (username, password) => {
    try {
      dispatch(loginIn(username, password))
      showMessage('Welcome back', 'successful')
    } catch (exception) {
      console.log(exception)
      showMessage('Error login wrong password', 'error')
    }
  }

  const onSubmit = (blog) => {
    try {
      dispatch(addBlog(blog))
      showMessage('You successful added new blog post ', 'successful')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      showMessage('Error create new blog', 'error')
    }
  }

  const hadleOnLike = (blog) => {
    try {
      dispatch(updateLike(blog))
      showMessage('Like added to blog ', 'successful')
    } catch (error) {
      console.log(error)
      showMessage('Error add like', 'error')
    }
  }

  const hadleOnDelete = (id) => {
    try {
      dispatch(removeBlog(id))
      showMessage('Blog deleted ', 'successful')
    } catch (error) {
      console.log(error)
      showMessage('Error delete Blog', 'error')
    }
  }

  const sortBlogs = () => {
    const status = sortFlag
    setFlag(!status)
    const sortedBlogs = blogs.toSorted((a, b) => {
      if (sortFlag) {
        if (a.likes < b.likes) return -1
        else if (a.likes > b.likes) return 1
      } else {
        if (a.likes > b.likes) return -1
        else if (a.likes < b.likes) return 1
      }

      return 0
    })
    dispatch(setBlog(sortedBlogs))
  }

  const logOut = () => {
    dispatch(loginOut())
  }

  const LoginIn = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm handleLogin={handleLogin} />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const BlogView = () => (
    <div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          hadleOnLike={hadleOnLike}
          hadleOnDelete={hadleOnDelete}
        />
      ))}
    </div>
  )

  if (user !== null) {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        <p>
          {user.username} logged in<button onClick={logOut}>logout</button>
        </p>

        <Togglable buttonLabel="new blog" name="cancel" ref={blogFormRef}>
          <BlogForm onSubmit={onSubmit} />
        </Togglable>
        <button onClick={() => sortBlogs()}>sort</button>
        <Users/>
        <BlogView />
      </>
    )
  } else {
    return (
      <>
        <Notification message={message.text} color={message.color} />
        <LoginIn />
        <button onClick={() => sortBlogs()}>sort</button>
        <BlogView />
      </>
    )
  }
}

export default App
