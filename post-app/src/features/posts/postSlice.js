import { createSlice, nanoid } from "@reduxjs/toolkit";
const initialState = [
  {
    id: 1,
    title: "test 1",
    content: "Hello, I'm User 1",
  },
  {
    id: 2,
    title: "test 2",
    content: "Hello, I'm User 2",
  },
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdd: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
          },
        };
      },
    },
  },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts;
export const { postAdd } = postSlice.actions;
