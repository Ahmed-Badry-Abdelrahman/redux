import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/AsyncFun/getProducts";
import {
  selectAllProducts,
  numOfProducts,
} from "../../features/products/productsSlice";
import { useEffect } from "react";
import Product from "./Product";
import EditProductForm from "./EditProductForm";
import AddProductForm from "./AddProductForm";

function ProductsList() {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const totalProducts = useSelector(numOfProducts);
  const error = useSelector((state) => state.products.error);
  const isLoading = useSelector((state) => state.products.isLoading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);
  // Render loading, error, or products based on the state
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="product-list">
      <AddProductForm />
      <EditProductForm />
      <h1>Products List : there a {totalProducts} products</h1>
      <ul>
        {products.length > 0 &&
          products.map((product) => {
            return <Product key={product.id} productId={product.id} />;
          })}
      </ul>
    </div>
  );
}

export default ProductsList;
