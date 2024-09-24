import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// base URL
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    try {
      console.log("id from delete : ", productId);
      const response = await api.delete(`/products/${productId}`);
      console.log("response from delete: ", response.data);
      return response.data ? response.data : productId;
    } catch (error) {
      throw new Error(`can not delete this product ${error.message}`);
    }
  }
);
