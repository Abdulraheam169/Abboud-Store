import { useParams, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { productsActions } from "../state-store/state-store";

export default function ProductPage() {
  const { id } = useParams();
  const items = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const product = items.find((pro) => pro.id == id);

  const quantity = product.quantity || 1;
  const totalPrice = product.totalPrice || product.newPrice * quantity;

  return (
    <>
      <NavLink to=".." relative="path" className="back">
        Back To Products
      </NavLink>

      <div className="p-card">
        <div className="d-card">
          <div className="d-title">{product.title}</div>

          <img src={product.image} alt={product.title} className="d-img" />

          <div className="d-price">&#x24;{product.newPrice}</div>

          <div className="d-description">
            Description: {product.description}
          </div>
          <div className="d-category">Category: {product.category}</div>

          <hr />

          {product.isAdded ? (
            <>
              <button
                onClick={() =>
                  dispatch(productsActions.toggleAddedState(product.id))
                }
                id={product.id}
              >
                Remove From The Card
              </button>

              <input
                onChange={(e) =>
                  ss.handleQuantity(product.id, parseInt(e.target.value))
                }
                value={quantity}
                min={1}
                type="number"
                name="count"
              />

              <div className="total">Total: {totalPrice}&#x24;</div>
            </>
          ) : product.isAvailable ? (
            <button
              onClick={() =>
                dispatch(productsActions.toggleAddedState(product.id))
              }
            >
              Add To The Card
            </button>
          ) : undefined}
        </div>
      </div>
    </>
  );
}
