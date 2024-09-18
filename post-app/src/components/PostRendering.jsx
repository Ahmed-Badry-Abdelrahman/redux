/* eslint-disable react/prop-types */
import React from "react";

export const PostRendering = ({ posts }) => {
  console.log(posts);
  return (
    <React.Fragment>
      {posts &&
        posts.map((post) => {
          return (
            <div key={post.id} className="post">
              <h2>{post.title}</h2>
              <p>{post.content.substring(0, 100)}</p>
            </div>
          );
        })}
    </React.Fragment>
  );
};
