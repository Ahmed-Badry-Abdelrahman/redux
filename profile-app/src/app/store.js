import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../features/users/usersSlice";
const store = configureStore({
  reducer: {
    // Define your slices here
    users: usersSlice,
  },
});

export default store;
