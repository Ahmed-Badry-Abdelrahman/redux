import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../AsyncThunk/fetchData";
import { postData } from "../AsyncThunk/postData";
import { sub } from "date-fns";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await fetchData("/posts");
  let min = 1;

  const posts = response.data.map((post) => {
    return {
      ...post,
      date: sub(new Date(), { minutes: min++ }).toISOString(),
      reactions: { like: 0, dislike: 0, heart: 0 },
      reactionTrack: null,
    };
  });

  return posts;
});

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postContent) => {
    const response = await postData(postContent);
    return response.data;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
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
      return state.posts.filter((post) => post.id !== postId);
    },
    addReaction: (state, action) => {
      const { postId, reaction } = action.payload;
      const post = state.posts.find((post) => post.id === postId);

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
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      console.log(action.payload);
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.reactions = {
        like: 0,
        dislike: 0,
        heart: 0,
      };
      console.log(action.payload);
      state.posts.push(action.payload);
    });
  },
});

export default postSlice.reducer;
export const selectAllPosts = (state) => state.posts.posts;
export const selectPostsStatus = (state) => state.posts.isLoading;
export const selectPostsErrors = (state) => state.posts.error;
export const { addPost, deletePost, addReaction } = postSlice.actions;
