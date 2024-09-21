import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
export const fetchData = async (url) => {
  const response = await api.get(url);
  return response;
};
