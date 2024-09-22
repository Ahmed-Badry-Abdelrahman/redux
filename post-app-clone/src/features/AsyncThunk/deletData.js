import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const deleteData = async (postContent) => {
  const response = await api.delete(`/posts/${postContent.id}`);

  if (response?.status === 200) {
    // Return the post ID to indicate successful deletion
    return { id: postContent.id };
  }

  // Throwing an error if the status is not 200
  throw new Error("Delete failed");
};
