import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { LuDollarSign, LuTrash } from "react-icons/lu";
import { cartActions } from "../state-store/state-store";
export default function MyCard() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    setTotal(0);
    cart.items.map((pro) => {
      setTotal((prev) => (prev += pro.quantity * pro.newPrice));
    });
  }, [cart]);

  if (!cart.items || cart.items.length === 0) {
    return <div>Please add some Items</div>;
  } else {
    return (
      <div className="c-container">
        <div className="c-head">
          <span className="c-img">Product</span>
          <span className="c-title">Title</span>
          <span className="c-price">Single</span>
          <span className="c-quantity">Count</span>
          <span className="c-total">Total</span>
          <span className="remo"></span>
        </div>
        {cart.items.map((product) => {
          const quantity = product.quantity;
          const totalPrice = product.totalPrice || product.newPrice * quantity;

          return (
            <div className="product-card c-card" key={product.id}>
              <img src={product.image} alt={product.title} className="c-img" />

              <div className="c-title">{product.title}</div>

              <div className="c-price">{product.newPrice}</div>

              <input
                onChange={(e) =>
                  dispatch(
                    cartActions.handleQuantity({
                      id: product.id,
                      value: parseInt(e.target.value),
                    }),
                  )
                }
                value={quantity}
                min={1}
                type="number"
                name="count"
                className="c-quantity"
              />

              <div className="c-total">{totalPrice}</div>

              <button
                className="remo"
                onClick={() => {
                  dispatch(cartActions.removeFromCart(product));
                  console.log(product);
                  console.log(cart.items);
                }}
              >
                <LuTrash />
              </button>
            </div>
          );
        })}
        <hr />
        <div style={{ textAlign: "right" }}>
          Total Cash : {total} <LuDollarSign />
        </div>
        <Link
          to="form"
          style={{
            textDecoration: "none",
            color: "white",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "40px",
              backgroundColor: " #415a77",
              textAlign: "center",
              padding: "4px",
              fontSize: "18px",
              fontWeight: "600",
              borderRadius: "10px",
            }}
          >
            Continue
          </div>
        </Link>
      </div>
    );
  }
}
