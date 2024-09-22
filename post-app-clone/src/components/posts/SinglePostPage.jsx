import { useSelector } from "react-redux";
import { selectPostById } from "../../features/posts/postsSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PostTime from "./PostTime";
import PostUser from "./PostUser";
import PostReactions from "./PostReactions";

function SinglePostPage() {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  return (
    <div>
      {post ? (
        <section className="single-post-container">
          <article className="single-post post">
            <div className="title-date">
              <h2>{post.title}</h2>
              <PostTime timeStamp={post.date} />
            </div>
            <p className="post-body">{post.body}</p>

            <PostUser post={post} />
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostReactions post={post} />
          </article>
        </section>
      ) : (
        <section>
          <p>Post Not Found</p>
        </section>
      )}
    </div>
  );
}

export default SinglePostPage;
