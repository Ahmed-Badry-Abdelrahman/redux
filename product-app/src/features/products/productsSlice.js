import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchProducts } from "../AsyncFun/getProducts";
import { addProduct } from "../AsyncFun/addProduct";
import { updateProduct } from "../AsyncFun/updateProduct";
import { deleteProduct } from "../AsyncFun/deleteProduct";

const productsAdapter = createEntityAdapter({
  selectId: (product) => product.id, // Select product id from payload
  // sortComparer: (a, b) => a.title.localeCompare(b.title),
  sortComparer: (a, b) => a.price - b.price,
});

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState({
    isLoading: false,
    error: null,
    editProductId: null,
  }),
  reducers: {
    setEditProductId: (state, action) => {
      state.editProductId = action.payload;
    },
    clearEditProductId: (state) => {
      state.editProductId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        productsAdapter.setAll(state, action.payload); // Set products in state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add a new product
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log("from addProduct action ", action.payload);
        productsAdapter.setOne(state, action.payload);
      })
      // update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        productsAdapter.updateOne(state, {
          id: action.payload.id,
          changes: {
            title: action.payload.title,
            description: action.payload.description,
            price: action.payload.price,
          },
        });
      })
      // delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log("id from deleteProduct : ", action.id);
        productsAdapter.removeOne(state, action.payload.id);
      });
  },
});

export default productsSlice.reducer;
const selector = productsAdapter.getSelectors((state) => state.products);
export const selectAllProducts = selector.selectAll;
export const selectProductById = selector.selectById;
export const numOfProducts = selector.selectTotal;
export const editProductId = (state) => state.products.editProductId;
export const { setEditProductId, clearEditProductId } = productsSlice.actions;
