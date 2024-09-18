import { useSelector } from "react-redux";
import { selectAllPosts } from "../features/posts/postSlice";
import { PostRendering } from "../components/PostRendering";
import { AddFormPost } from "../components/AddFormPost";
const PostList = () => {
  const posts = useSelector(selectAllPosts);
  return (
    <section>
      <AddFormPost />
      <PostRendering posts={posts} />
    </section>
  );
};

export default PostList;
