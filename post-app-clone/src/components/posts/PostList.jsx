import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  selectPostsErrors,
  selectPostsStatus,
  fetchPosts,
} from "../../features/posts/postsSlice";
import { useEffect } from "react";
import Post from "./Post";
const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsErrors = useSelector(selectPostsErrors);
  const postsStatus = useSelector(selectPostsStatus);

  const dispatch = useDispatch();
  const orderedPost = posts
    .slice() // take a copy and sort it
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <section className="post-list">
      {postsStatus ? (
        <p>Loading...</p>
      ) : postsErrors ? (
        <p>Error: {postsErrors}</p>
      ) : orderedPost.length > 0 ? (
        orderedPost.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts found</p>
      )}
    </section>
  );
};

export default PostList;
