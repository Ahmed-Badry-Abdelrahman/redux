import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// base URL
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (productContent) => {
    try {
      const response = await api.put(
        `/products/${productContent.id}`,
        productContent
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(`can not update product: ${error.message}`);
    }
  }
);
