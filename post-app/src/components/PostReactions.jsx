/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addReaction } from "../features/posts/postSlice";

const reactionsEmoji = {
  like: "👍🏻",
  dislike: "👎🏼",
  heart: "❤️",
};
const PostReactions = ({ post }) => {
  const dispatch = useDispatch();

  const reactionClicked = (name) => {
    dispatch(addReaction({ postId: post.id, reaction: name }));
  };
  return (
    <div className="post-reactions">
      {Object.entries(reactionsEmoji).map(([name, emoji]) => {
        const isReacted = post.userReaction === name;
        return (
          <button
            key={name}
            className={isReacted && `reacted-${name}`}
            onClick={() => reactionClicked(name)}
          >
            {emoji} {""} {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
};

export default PostReactions;
