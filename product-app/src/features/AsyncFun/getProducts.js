import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// base URL
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

// fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products, ${error.message}`);
    }
  }
);
