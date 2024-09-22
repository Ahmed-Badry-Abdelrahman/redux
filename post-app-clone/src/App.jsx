import PostList from "./components/posts/PostList";
import AddPostForm from "./components/posts/AddPostForm";
import SinglePostPage from "./components/posts/SinglePostPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
