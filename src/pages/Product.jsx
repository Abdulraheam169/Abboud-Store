import { useParams, NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { cartActions, productsActions } from "../state-store/state-store";

export default function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);

  const product = items.find((pro) => pro.id == id);
  const cartItem = cartItems.find((item) => item.id == id);

  if (!product) {
    return <div className="loading">Loading product...</div>;
  }

  const quantity = cartItem ? cartItem.quantity : 1;
  const totalPrice = product.newPrice * quantity;

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

          {cartItem ? (
            <>
              <button
                onClick={() => {
                  dispatch(cartActions.removeFromCart(product));
                  dispatch(productsActions.toggleAddedState(product.id));
                }}
              >
                Remove From The Cart
              </button>

              <input
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  dispatch(
                    cartActions.handleQuantity({
                      id: product.id,
                      value: isNaN(val) ? 1 : val,
                    }),
                  );
                }}
                value={quantity}
                min={1}
                type="number"
                name="count"
              />

              <div className="total">Total: {totalPrice.toFixed(2)}&#x24;</div>
            </>
          ) : product.isAvailable ? (
            <button
              onClick={() => {
                dispatch(cartActions.addToCart(product));
                dispatch(productsActions.toggleAddedState(product.id));
              }}
            >
              Add To The Cart
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
