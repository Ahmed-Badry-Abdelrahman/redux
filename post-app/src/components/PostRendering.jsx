/* eslint-disable react/prop-types */
import React from "react";
import UserRendering from "./UserRendering";
import DateRendering from "./DateRendering";
import PostReactions from "./PostReactions";

export const PostRendering = ({ posts }) => {
  // Convert date strings to Date objects for proper sorting
  const orderedPost = posts
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <React.Fragment>
      {orderedPost.length > 0 ? (
        orderedPost.map((post) => (
          <div key={post.id} className="post">
            <div className="flex space-btw">
              <h2>{post.title}</h2>
              <DateRendering timestamp={post.date} />
            </div>
            <p>{post.content.substring(0, 100)}</p>
            <UserRendering userId={post.userId} />
            <hr />
            <PostReactions post={post} />
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </React.Fragment>
  );
};
