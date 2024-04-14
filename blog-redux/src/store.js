import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    comments : commentReducer,
  }
})
export default store
