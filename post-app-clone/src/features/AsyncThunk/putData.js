import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const putData = async (postContent) => {
  try {
    const response = await api.put(`/posts/${postContent.id}`, postContent);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
