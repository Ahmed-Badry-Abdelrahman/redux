import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
export const selectAllUsers = (state) => state.users;
