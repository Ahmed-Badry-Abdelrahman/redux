import React from "react";
import PostList from "./components/posts/PostList";
import AddPostForm from "./components/posts/AddPostForm";
function App() {
  return (
    <React.Fragment>
      <AddPostForm />
      <PostList />
    </React.Fragment>
  );
}

export default App;
