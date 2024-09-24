import { useDispatch } from "react-redux";
import { setEditProductId } from "../../features/products/productsSlice";
import { deleteProduct } from "../../features/AsyncFun/deleteProduct";
/* eslint-disable react/prop-types */
function Product({ product }) {
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
