import { useSelector } from "react-redux";
import { selectAllPosts } from "../../features/posts/postsSlice";
import PostTime from "./PostTime";
import PostReactions from "./PostReactions";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const orderedPost = posts
    .slice() // take a copy and sort it
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <section className="post-list">
      {orderedPost.length > 0
        ? orderedPost.map((post) => {
            return (
              <div key={post.id} className="posts">
                <div className="title-date">
                  <h2>{post.title}</h2>
                  <PostTime timeStamp={post.date} />
                </div>
                <p>{post.content.substring(0, 80)}</p>
                <PostReactions post={post} />
              </div>
            );
          })
        : "no posts fonds"}
    </section>
  );
};

export default PostList;
