import { useDispatch, useSelector } from "react-redux";
import {
  editProductId,
  selectProductById,
} from "../../features/products/productsSlice";
import { useEffect, useState } from "react";
import { updateProduct } from "../../features/AsyncFun/updateProduct";
import React from "react";

function EditProductForm() {
  const dispatch = useDispatch();
  const productId = useSelector(editProductId);
  const product = useSelector((state) => selectProductById(state, productId));

  // Form state variables
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const canSave =
    [productTitle, productDescription, productPrice].every(Boolean) &&
    requestStatus === "idle";

  // Set initial form values when product is loaded
  useEffect(() => {
    if (product) {
      setProductTitle(product.title || "");
      setProductDescription(product.description || "");
      setProductPrice(product.price || "");
    }
  }, [product]);

  const saveProductOnClick = async (e) => {
    e.preventDefault();

    if (!canSave) return;

    try {
      setRequestStatus("pending");
      const price = parseFloat(productPrice);
      if (isNaN(price)) {
        alert("Price must be a valid number.");
        setRequestStatus("idle");
        return;
      }

      await dispatch(
        updateProduct({
          id: productId,
          title: productTitle,
          price: price,
          description: productDescription,
        })
      ).unwrap();

      // Optionally navigate to another page or show a success message
      alert("Product updated successfully!");
    } catch (error) {
      console.error(`Cannot update product: ${error.message}`);
    } finally {
      setRequestStatus("idle");
    }
  };

  if (!product) {
    return <p>click on edit btn to edit</p>;
  }

  return (
    <React.Fragment>
      <div className="edit-product-form">
        <h1>Edit Product</h1>
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
            <button
              className="save-btn"
              onClick={saveProductOnClick}
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditProductForm;
