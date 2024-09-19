import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, name: "alice" },
  { id: 2, name: "bob" },
  { id: 3, name: "charlie" },
];

const postSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export default postSlice.reducer;
