import { createSlice } from '@reduxjs/toolkit'
import CommentService from '../services/comments'

const CommentSlice = createSlice({
  name: 'CommentApp',
  initialState: [],
  reducers: {
    getComment(state, action) {
      return state
    },

    setComments(state, action) {
      return action.payload
    },
    setComment(state, action) {
      state.push(action.payload)
      return state
    },
  },
})

export const { getComments, setComment, setComments } = CommentSlice.actions

export const loadComments = () => {
  return async (dispatch) => {
    const comments = CommentService.getAll()
    dispatch(setComments(comments.data))
  }
}

export const addComment = (comment) => {
  return async (dispatch) => {
    const newComment = { id: Math.round(Math.random() * 100), post: comment }
    dispatch(setComment(newComment))
  }
}

export default CommentSlice.reducer
