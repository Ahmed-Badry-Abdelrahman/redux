import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/posts/postsSlice";
const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addPostStatus, setAddPostStatus] = useState("idle");
  const userId = 1;
  const dispatch = useDispatch();
  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const canSubmit =
    [title, content, userId].every(Boolean) && addPostStatus === "idle";

  const onPostSend = async (e) => {
    e.preventDefault();
    if (!canSubmit) return; // Return early if can't submit

    setAddPostStatus("pending");

    try {
      await dispatch(createPost({ title, body: content, userId })).unwrap();
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Failed to save the post", error);
    } finally {
      setAddPostStatus("idle");
    }
  };

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
