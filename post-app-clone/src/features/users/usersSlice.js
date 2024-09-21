import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../AsyncThunk/fetchData";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetchData("/users");
  return response.data; // Return the fetched data
});

const postSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload; // This now correctly receives the fetched data
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
export const selectAllUsers = (state) => state.users.users;
export const selectUsersStatus = (state) => state.users.isLoading;
export const selectUsersErrors = (state) => state.users.error;
