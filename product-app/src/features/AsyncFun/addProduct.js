import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// base URL

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productContent) => {
    try {
      const response = await api.post("/products", productContent);
      console.log("response from add product", response.data);
      return response.data; // This should include the generated id
    } catch (error) {
      throw new Error(`Product addition failed: ${error.message}`);
    }
  }
);
