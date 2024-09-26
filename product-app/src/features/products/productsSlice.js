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
    reactions: {
      heart: 0,
    },
  }),
  reducers: {
    setEditProductId: (state, action) => {
      state.editProductId = action.payload;
    },
    clearEditProductId: (state) => {
      state.editProductId = null;
    },
    addProductReaction: (state, action) => {
      const { id, reaction } = action.payload;
      const product = state.entities[id];
      if (product) {
        if (product.reactionTrack) {
          product.reactionTrack = null;
          product.reactions[reaction] -= 1;
          return;
        }
        product.reactions[reaction] += 1;
        product.reactionTrack = reaction;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("from setAll: ", action.payload);
        const newProducts = action.payload.map((product) => {
          return {
            ...product,
            reactions: {
              heart: 0,
            },
            reactionTrack: null,
          };
        });
        console.log("from setAll2: ", newProducts);
        productsAdapter.setAll(state, newProducts); // Set products in state
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Add a new product
      .addCase(addProduct.fulfilled, (state, action) => {
        console.log("from addProduct action ", action.payload);
        const newProduct = {
          ...action.payload,
          reactions: {
            heart: 0,
          },
        };
        productsAdapter.setOne(state, newProduct);
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
export const { setEditProductId, clearEditProductId, addProductReaction } =
  productsSlice.actions;
