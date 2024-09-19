import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../features/posts/postsSlice";
const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const onPostSend = (e) => {
    e.preventDefault();
    if (title && content) {
      dispatch(addPost(title, content));
      setTitle("");
      setContent("");
    }
  };

  const canSubmit = title && content;
  return (
    <div className="add-post-form">
      <form onSubmit={onPostSend}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="content">content: </label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={onContentChange}
        />
        <button type="submit" disabled={!canSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
