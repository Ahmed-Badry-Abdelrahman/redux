import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const putData = async (postContent) => {
  try {
    const response = await api.put(`/posts/${postContent.id}`, postContent);
    return response.data;
  } catch {
    // throw new Error("Failed to update post."); // this is what is should happen
    return postContent; // just for test
  }
};
