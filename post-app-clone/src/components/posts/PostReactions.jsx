/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { addReaction } from "../../features/posts/postsSlice";

const reactionsEmoji = {
  like: "👍🏻",
  dislike: "👎🏼",
  heart: "❤️",
};

function PostReactions({ post }) {
  const dispatch = useDispatch();

  const onReactionClick = (name) => {
    dispatch(addReaction({ postId: post.id, reaction: name }));
  };

  return (
    <div className="reactions">
      {Object.entries(reactionsEmoji).map(([name, emoji]) => {
        const isReacted = post.reactionTrack === name;
        return (
          <button
            key={name}
            onClick={() => onReactionClick(name)}
            className={`reaction ${isReacted ? `${name}-reaction` : ""}`}
          >
            {emoji}
            {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
}

export default PostReactions;
