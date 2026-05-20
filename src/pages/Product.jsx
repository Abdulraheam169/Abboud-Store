import { useParams, NavLink } from "react-router";

export default function ProductPage({ products, toggle, onChange }) {
  const { id } = useParams();

  const product = products.find((pro) => String(pro.id) === String(id));

  if (!product) {
    return (
      <div className="error-container">
        <NavLink to=".." relative="path" className="back">
          Back To Products
        </NavLink>
        <div className="error-message">Product not found!</div>
      </div>
    );
  }

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

          <div className="pricing">
            <div className="d-old-price">
              Old Price: <span>{product.oldPrice}</span>
            </div>
            <div className="d-price">Price: {product.newPrice}</div>
          </div>

          <div className="d-descrition">Description: {product.description}</div>
          <div className="d-category">Category: {product.category}</div>

          <hr />

          {product.isAdded ? (
            <>
              <button onClick={() => toggle(product.id)} id={product.id}>
                Remove From The Card
              </button>

              <input
                onChange={(e) => onChange(product.id, parseInt(e.target.value))}
                value={quantity}
                min={1}
                type="number"
                name="count"
              />

              <div className="total">Total: {totalPrice}</div>
            </>
          ) : product.isAvailable ? (
            <button onClick={() => toggle(product.id)}>Add To The Card</button>
          ) : (
            <div className="out-of-stock">Out of Stock</div>
          )}
        </div>
      </div>
    </>
  );
}
