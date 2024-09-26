/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import {
  addProductReaction,
  selectProductById,
} from "../../features/products/productsSlice";

const reactions = {
  heart: "❤️",
};

const Reactions = ({ productId }) => {
  const product = useSelector((state) => selectProductById(state, productId));
  console.log("product", product);
  const dispatch = useDispatch();

  const reactionOnClick = (name) => {
    dispatch(addProductReaction({ id: product.id, reaction: name }));
  };
  return (
    <div className="reactions-container">
      {Object.entries(reactions).map(([name, emoji]) => {
        return (
          <button key={name} onClick={() => reactionOnClick(name)}>
            {emoji}
            {product.reactions ? product.reactions[name] : 0}
          </button>
        );
      })}
    </div>
  );
};

export default Reactions;
