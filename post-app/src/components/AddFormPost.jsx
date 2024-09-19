import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { postAdd } from "../features/posts/postSlice";
import { selectAllUsers } from "../features/users/usersSlice";

export const AddFormPost = () => {
  const [title, setPostTitle] = useState("");
  const [content, setPostContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const onTitleChange = (e) => setPostTitle(e.target.value);
  const onContentChange = (e) => setPostContent(e.target.value);
  const onAuthorChange = (e) => setUserId(e.target.value);

  const onPostSaveClicked = (e) => {
    e.preventDefault();
    if (content && title) {
      dispatch(postAdd(title, content, userId));
      setPostTitle("");
      setPostContent("");
      setUserId(""); // Clear userId after submission
    }
  };

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const canSave = content && title;

  return (
    <div>
      <form className="posts-form" onSubmit={onPostSaveClicked}>
        <label htmlFor="post-title">Post title: </label>
        <input
          type="text"
          id="post-title"
          name="post-title"
          value={title}
          onChange={onTitleChange}
        />

        <label htmlFor="post-user">Author: </label>
        <select id="post-user" value={userId} onChange={onAuthorChange}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="post-content">Post content: </label>
        <input
          type="text"
          id="post-content"
          name="post-content"
          value={content}
          onChange={onContentChange}
        />

        <button type="submit" disabled={!canSave}>
          Send post
        </button>
      </form>
    </div>
  );
};
