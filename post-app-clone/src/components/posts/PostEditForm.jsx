import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  updatePost,
  deletePost,
} from "../../features/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";
import { selectAllUsers } from "../../features/users/usersSlice";

function PostEditForm() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  // console.log(post.id);
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChange = (e) => setTitle(e.target.value);
  const onBodyChange = (e) => setBody(e.target.value);
  const onUserIdChange = (e) => setUserId(Number(e.target.value));

  const canSave =
    [title, body, userId].every(Boolean) && requestStatus === "idle";

  const onPostSend = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!canSave) {
      return;
    }
    try {
      setRequestStatus("pending");
      await dispatch(
        updatePost({
          id: post.id,
          title,
          body,
          userId,
          reactions: post.reactions,
          reactionTrack: post.reactionTrack,
        })
      ).unwrap();

      setTitle("");
      setBody("");
      setUserId(post.userId); // Use initial post's userId instead of empty string
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error("Failed to update post", error);
    } finally {
      setRequestStatus("idle");
    }
  };
  const deletePostOnClick = async () => {
    try {
      setRequestStatus("pending");
      console.log("Deleting post with id:", post.id);

      // Await the dispatched action
      const result = await dispatch(deletePost({ id: post.id })).unwrap();

      // Check if the result contains the expected id
      if (result?.id) {
        console.log("Post deleted successfully:", result.id);
        navigate("/");
      } else {
        console.error("Delete could not complete", result);
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const userOption = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  return (
    <div className="post-edit-form">
      <form onSubmit={onPostSend}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="userId">User: </label>
        <select
          id="userId"
          name="userId"
          value={userId}
          onChange={onUserIdChange}
        >
          <option value=""></option>
          {userOption}
        </select>
        <label htmlFor="content">Content: </label>
        <textarea
          id="content"
          name="content"
          value={body}
          onChange={onBodyChange}
        />
        <button type="submit" disabled={!canSave}>
          Submit
        </button>
        <button
          type="button"
          onClick={deletePostOnClick}
          className="delete-btn"
        >
          Delete the post
        </button>
      </form>
    </div>
  );
}

export default PostEditForm;
