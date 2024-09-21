/* eslint-disable react/prop-types */
import PostTime from "./PostTime";
import PostReactions from "./PostReactions";
import PostUser from "./PostUser";

function Post({ post }) {
  return (
    <div className="posts">
      <div className="title-date">
        <h2>{post.title.substring(0, 20)}</h2>
        <PostTime timeStamp={post.date} />
      </div>
      <p>{post.body.substring(0, 80)}</p>
      <PostReactions post={post} />
      <PostUser post={post} />
    </div>
  );
}

export default Post;
