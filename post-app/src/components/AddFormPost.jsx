import { useDispatch } from "react-redux";
import { useState } from "react";
import { postAdd } from "../features/posts/postSlice";
import { nanoid } from "@reduxjs/toolkit";
export const AddFormPost = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const dispatch = useDispatch();

  const onTitleChange = (e) => setPostTitle(e.target.value);
  const onContentChange = (e) => setPostContent(e.target.value);

  const onPostSaveClicked = () => {
    dispatch(
      postAdd({
        id: nanoid(),
        title: postTitle,
        content: postContent,
      })
    );
  };
  console.log(postContent, postTitle);

  return (
    <div>
      <form className="posts-form">
        <label htmlFor="post-title">Post title: </label>
        <input
          type="text"
          id="post-title"
          name="post-title"
          onChange={onTitleChange}
        />
        <label htmlFor="post-content">Post content: </label>
        <input
          type="text"
          id="post-title"
          name="post-content"
          onChange={onContentChange}
        />

        <button onClick={onPostSaveClicked}>send post</button>
      </form>
    </div>
  );
};
