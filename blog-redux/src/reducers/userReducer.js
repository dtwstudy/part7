import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'
const userSlice = createSlice({
  name: 'UserApp',
  initialState: [],
  reducers: {
    getUser(state, action) {
      return state
    },

    setUser(state, action) {
      return action.payload
    },
  },
})

export const { getUser, setUser } = userSlice.actions
export const loginIn = (username, password) => {
  return async (dispatch) => {
    const user = await userService.login({ username, password })
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}
export const loginOut = () => {
  return async (dispatch) => {
    if (window.localStorage.getItem('loggedBlogappUser')) window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
