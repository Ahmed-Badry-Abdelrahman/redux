import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialState = [
  {
    id: 1,
    title: "test 1",
    content: "Hello, I'm User 1",
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    reactions: {
      like: 0,
      dislike: 0,
      heart: 0,
    },
    reactionTrack: null,
  },
  {
    id: 2,
    title: "test 2",
    content: "Hello, I'm User 2",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      like: 0,
      dislike: 0,
      heart: 0,
    },
    reactionTrack: null,
  },
  {
    id: 3,
    title: "test 3",
    content: "Hello, I'm User 3",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      like: 0,
      dislike: 0,
      heart: 0,
    },
    reactionTrack: null,
  },
];
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (title, content) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            reactions: {
              like: 0,
              dislike: 0,
              heart: 0,
            },
            reactionTrack: null,
          },
        };
      },
    },
    deletePost: (state, action) => {
      const { postId } = action.payload;
      return state.filter((post) => post.id !== postId);
    },
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.find((post) => post.id === postId);

      if (post) {
        // check if there a value in reaction track its mean the user is has been reacted on this post
        // so we need remove this previews reaction then add the newts one
        if (post.reactionTrack) {
          post.reactions[post.reactionTrack] -= 1;
        }
        post.reactions[reaction] += 1;
        post.reactionTrack = reaction;
      }
    },
  },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts;
export const { addPost, deletePost, addReaction } = postSlice.actions;
