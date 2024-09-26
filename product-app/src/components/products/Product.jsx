import { useDispatch, useSelector } from "react-redux";
import {
  setEditProductId,
  selectProductById,
} from "../../features/products/productsSlice";
import React from "react";
import { deleteProduct } from "../../features/AsyncFun/deleteProduct";
import Reactions from "./Reactions";
/* eslint-disable react/prop-types */
function Product({ productId }) {
  const product = useSelector((state) => selectProductById(state, productId));
  console.log("product", product);

  const dispatch = useDispatch();

  const handleEditClick = (id) => {
    dispatch(setEditProductId(id));
  };

  return (
    <li>
      <div className="product">
        <figure>
          <img src={product.image} alt={product.image} />
        </figure>
        <h2>{product.title}</h2>
        <p>{product.description.substring(0, 50)}...</p>
        <p>{product.price} $</p>
        <button type="button" onClick={() => handleEditClick(product.id)}>
          edit
        </button>
        <button
          type="button"
          onClick={() => dispatch(deleteProduct(product.id))}
        >
          Delete
        </button>
        <Reactions productId={product.id} />
      </div>
    </li>
  );
}

export default Product;
// {
//   id:1,
//   title:'...',
//   price:'...',
//   category:'...',
//   description:'...',
//   image:'...'
// },
