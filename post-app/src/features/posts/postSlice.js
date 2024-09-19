import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
  {
    id: 1,
    title: "test 1",
    content: "Hello, I'm User 1",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 12,
      dislike: 0,
      heart: 0,
    },
    userReaction: "like", // Track user's current reaction
  },
  {
    id: 2,
    title: "test 2",
    content: "Hello, I'm User 2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      like: 44,
      dislike: 2,
      heart: 23,
    },
    userReaction: "heart", // Track user's current reaction
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
            date: new Date().toISOString(),
            userId,
            reactions: {
              like: 0,
              dislike: 0,
              heart: 0,
            },
            userReaction: null, // Initialize user reaction
          },
        };
      },
    },
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.find((post) => post.id === postId);
      if (post) {
        // Remove the previous reaction if it exists
        if (post.userReaction) {
          post.reactions[post.userReaction] -= 1;
        }
        // Add the new reaction
        post.reactions[reaction] += 1;
        // Update the user's current reaction
        post.userReaction = reaction;
      }
    },
  },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts;
export const { postAdd, addReaction } = postSlice.actions;
