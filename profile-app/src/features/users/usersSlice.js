import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  isLoading: false,
  error: null,
  rsp: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response.data;
});

export const postChanges = createAsyncThunk(
  "users/postChanges",
  async (updatedPost) => {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      updatedPost
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeName: (state, action) => {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.title = action.payload.name;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(postChanges.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postChanges.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.find((user) =>
        user.id === action.payload.id ? (user.name = action.payload.name) : null
      );
    });
    builder.addCase(postChanges.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;
export const { changeName } = usersSlice.actions;
