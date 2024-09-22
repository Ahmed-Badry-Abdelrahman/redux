/* eslint-disable react/prop-types */
import PostTime from "./PostTime";
import PostReactions from "./PostReactions";
import PostUser from "./PostUser";

import { Link } from "react-router-dom";

function Post({ post }) {
  return (
    <div className="post">
      <div className="title-date">
        <h2>{post.title.substring(0, 20)}</h2>
        <PostTime timeStamp={post.date} />
      </div>
      <p>{post.body.substring(0, 80)}</p>

      <PostUser post={post} />

      <Link to={`/post/${post.id}`}>Read More</Link>

      <PostReactions post={post} />
    </div>
  );
}

export default Post;
