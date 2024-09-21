import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const postData = async (postContent) => {
  const response = await api.post("/posts", postContent);
  return response;
};

// export const createPost = async (title, body) => {
//     try {
//         const response = await api.post("/posts", { title, body });
//         return response.data;
//     } catch (error) {
//         throw new Error("Failed to create post.");
//     }
// };
