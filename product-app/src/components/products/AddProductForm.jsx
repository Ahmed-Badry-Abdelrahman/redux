import { useDispatch } from "react-redux";
import { addProduct } from "../../features/AsyncFun/addProduct";
import { useState } from "react";
import React from "react";
function AddProductForm() {
  const dispatch = useDispatch();

  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");
  const [productDescription, setProductDescription] = useState("");

  const canSave =
    [productTitle, productDescription, productPrice].every(Boolean) &&
    requestStatus === "idle";

  const addProductOnClick = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    try {
      setRequestStatus("pending");
      const price = parseFloat(productPrice);
      if (isNaN(price)) {
        alert("Price must be a number");
        setRequestStatus("idle");
        return;
      }

      await dispatch(
        addProduct({
          title: productTitle,
          price: price,
          description: productDescription,
        })
      ).unwrap();

      // Reset form
      setProductTitle("");
      setProductDescription("");
      setProductPrice("");
      alert("successfully add product");
    } catch (error) {
      console.error(`Cannot add product: ${error.message}`);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <React.Fragment>
      <div className="add-product-form">
        <h1>Add Product</h1>
        <form>
          <div>
            <label htmlFor="product-title">Product Title</label>
            <input
              type="text"
              id="product-title"
              name="product-title"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="product-description">Product Description</label>
            <input
              type="text"
              id="product-description"
              name="product-description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="product-price">Product Price</label>
            <input
              type="text"
              id="product-price"
              name="product-price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>

          <div>
            <button className="add-btn" onClick={addProductOnClick}>
              Add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default AddProductForm;
