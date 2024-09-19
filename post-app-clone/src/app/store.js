import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
const store = configureStore({
  reducer: {
    // Define your reducers here
    posts: postsReducer,
    users: usersReducer,
  },
});

export default store;
