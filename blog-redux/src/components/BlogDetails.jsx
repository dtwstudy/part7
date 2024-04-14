import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateLike } from '../reducers/blogReducer'
import { loadComments, addComment } from '../reducers/commentReducer'

const BlogDetails = () => {
  const [comment, setComment] = useState()
  const dispatch = useDispatch()
  const params = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog  = blogs.find(bl => bl.id === params )
  const comments = useSelector((state) => state.comments)
  useEffect(() => {
    dispatch(loadComments())
  }, [])
  if (!blog) {
    return (<div>Not found</div>)
  }
 

  const isLogin =
    localStorage.getItem('loggedBlogappUser') !== null ? true : false
  const UpdateLike = (blog) => {
    const newLike =
      blog.likes === null
        ? { ...blog, likes: 0 }
        : { ...blog, likes: blog.likes + 1 }

    try {
      dispatch(updateLike(newLike))
    } catch (error) {
      console.log(error)
    }
  }
  const addCommentTo = () => {
    try {
      dispatch(addComment(comment))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <p id="title" className="title">
        {blog.title} {blog.author}
      </p>
      <p id="url">{blog.url} </p>
      <p id="like" className="like">
        {blog.likes}
      </p>{' '}
      <button id="blike" onClick={() => UpdateLike(blog)}>
        like
      </button>
      <p id="author"> {blog.author} </p>
      <h3>comments</h3>
      <input
        type="text"
        name="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button onClick={() => addCommentTo()}>add comment</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.post}</li>
        ))}
      </ul>
    </>
  )
}
export default BlogDetails
