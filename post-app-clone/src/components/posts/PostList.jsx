import { useSelector } from "react-redux";
import {
  selectAllPosts,
  selectPostsErrors,
  selectPostsStatus,
} from "../../features/posts/postsSlice";

import Post from "./Post";
const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postsErrors = useSelector(selectPostsErrors);
  const postsStatus = useSelector(selectPostsStatus);

  const orderedPost = posts
    .slice() // take a copy and sort it
    .sort((a, b) => new Date(b.date) - new Date(a.date));

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
