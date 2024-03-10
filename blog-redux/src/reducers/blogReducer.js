import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'Blogapp',
  initialState: [],
  reducers: {
    getBlogList(state, action) {
      return state
    },
    createBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) => {
        if (blog.id === action.payload.id) blog = action.payload
        return blog
      })
    },
    deleteBlog(state, action) {},

    setBlog(state, action) {
      return action.payload
    },
    setUpdateLike(state, action) {

      return state.map((blog) => {
        if (blog.id === action.payload.id) blog = action.payload
        return blog
      })
    },
  },
})
export const {
  getBlogList,
  createBlog,
  updateBlog,
  deleteBlog,
  setBlog,
  setUpdateLike,
} = blogSlice.actions

export const loadsBlogs = () => {
  return async (dispacth) => {
    const blogAll = await BlogService.getAll()
    dispacth(setBlog(blogAll))
  }
}
export const addBlog = (blog) => {
  return async (dispacth) => {
    const blogNew = await BlogService.create(blog)
    dispacth(createBlog(blogNew))
  }
}

export const editBlog = (blog) => {
  return async (dispacth) => {
    const blogNew = await BlogService.updateBlog(blog.id, blog)
  }
}
export const updateLike = (blog) => {
  return async (dispacth) => {
    const updatedLike = await BlogService.update(blog.id, blog)
    dispacth(setUpdateLike(updatedLike))
  }
}
export default blogSlice.reducer
