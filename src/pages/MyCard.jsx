import React from "react";
import { Link } from "react-router";
import { LuDollarSign, LuTrash } from "react-icons/lu";

export default function MyCard({ items, onChange, remove }) {
  if (!items || items.length === 0) {
    return <div>Please add some Items</div>;
  }
  const [total, setTotal] = React.useState(0);
  React.useEffect(() => {
    setTotal(0);
    items.map((pro) => {
      console.log(total);
      console.log(total + pro.newPrice);
      console.log(pro.newQuantity);
      pro.quantity
        ? setTotal((prev) => (prev += pro.totalPrice))
        : setTotal((prev) => (prev += pro.newPrice));
    });
  }, [items]);

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
      {items.map((product) => {
        const quantity = product.quantity || 1;
        const totalPrice = product.totalPrice || product.newPrice * quantity;

        return (
          <div className="product-card c-card" key={product.id}>
            <img src={product.image} alt={product.title} className="c-img" />

            <div className="c-title">{product.title}</div>

            <div className="c-price">{product.newPrice}</div>

            <input
              onChange={(e) => onChange(product.id, parseInt(e.target.value))}
              value={quantity}
              min={1}
              type="number"
              name="count"
              className="c-quantity"
            />

            <div className="c-total">{totalPrice}</div>

            <button className="remo" onClick={() => remove(product.id)}>
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
