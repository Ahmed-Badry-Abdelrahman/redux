/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import {
  count,
  increment,
  addProduct,
  addProduct2,
  selectAllProduct,
  numberOfProducts,
  selectProductById,
  updateProduct,
  updateProduct2,
  deleteProduct,
} from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

function Counter() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct);
  const [productId, setProductId] = useState(null);

  const product = useSelector((state) => selectProductById(state, productId));

  const [proId, setProId] = useState("");
  const [proName, setProName] = useState("");
  const [proPrice, setProPrice] = useState("");

  const [eProId, setEProId] = useState("");
  const [eProName, setEProName] = useState("");
  const [eProPrice, setEProPrice] = useState("");

  useEffect(() => {
    if (product) {
      setEProId(product?.id);
      setEProName(product?.name);
      setEProPrice(product?.price);
    }
  }, [product]);
  // Log available products
  console.log("Available Products:", products);

  const addProductOnClick = () => {
    dispatch(addProduct({ id: proId, name: proName, price: proPrice }));
  };

  const UpdateProductOnClick = () => {
    try {
      dispatch(
        updateProduct({
          id: eProId,
          changes: { name: eProName, price: eProPrice },
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <br />
      <form>
        <label htmlFor="add-pro"> Add Products</label>
        <input
          type="text"
          id="add-pro"
          value={proId}
          onChange={(e) => setProId(e.target.value)}
        />
        <input
          type="text"
          value={proName}
          onChange={(e) => setProName(e.target.value)}
        />
        <input
          type="text"
          value={proPrice}
          onChange={(e) => setProPrice(e.target.value)}
        />
        <button type="button" onClick={addProductOnClick}>
          Add Product
        </button>
      </form>
      <br />
      <hr />
      <hr />
      <hr />

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            Product ID: {product.id} - Product Name: {product.name} - Product
            Price: ${product.price}
            <button type="button" onClick={() => setProductId(product.id)}>
              edit
            </button>
          </li>
        ))}
      </ul>

      <br />
      {product && (
        <form>
          <label htmlFor="e-pro"> e Products</label>
          <input
            type="text"
            id="e-pro"
            value={eProId}
            onChange={(e) => setEProId(e.target.value)}
          />
          <input
            type="text"
            value={eProName}
            onChange={(e) => setEProName(e.target.value)}
          />
          <input
            type="text"
            value={eProPrice}
            onChange={(e) => setEProPrice(e.target.value)}
          />
          <button type="button" onClick={UpdateProductOnClick}>
            Update
          </button>
        </form>
      )}
    </div>
  );
}

export default Counter;
