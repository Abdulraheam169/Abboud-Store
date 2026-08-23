import React, { useContext } from "react";
import { NavLink, useSearchParams } from "react-router";
import { useEffect } from "react";
import {
  fetchProducts,
  fetchCats,
  cartActions,
} from "../state-store/state-store";
import { productsActions } from "../state-store/state-store";
import { useDispatch, useSelector } from "react-redux";
import {
  LuShoppingCart,
  LuTrash2,
  LuTag,
  LuDollarSign,
  LuRefreshCw,
} from "react-icons/lu";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  const dispatch = useDispatch();
  const { categories, items, loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCats());
  }, [dispatch]);

  const [searchParams, setSearchParams] = useSearchParams();
  function handleSearchParams(key, val) {
    const s = new URLSearchParams(searchParams);
    if (val === null) {
      s.delete(key);
    } else {
      s.set(key, val);
    }
    setSearchParams(s);
  }
  function createFilters() {
    return (
      <>
        <input
          type="text"
          id="searchName"
          onChange={(e) => handleSearchParams("search", e.target.value)}
          placeholder="Search Your Product Here"
        />
        <input
          type="number"
          name="max-price"
          id="max-price"
          placeholder="Max Price"
          onChange={(e) => {
            e.target.value === ""
              ? handleSearchParams("max-price", null)
              : handleSearchParams("max-price", e.target.value);
          }}
          defaultValue={searchParams.get("max-price") || null}
        />
        {searchParams.get("search") !== null ||
        searchParams.get("max-price") !== null ? (
          <button
            className="reset-search"
            onClick={() => {
              setSearchParams({});
              document.querySelector("#max-price").value = null;
              document.querySelector("#searchName").value = null;
            }}
          >
            <LuRefreshCw />
          </button>
        ) : undefined}
      </>
    );
  }
  function createCategories() {
    return categories.map((category) => {
      return (
        <button
          key={category.id}
          onClick={() => {
            handleSearchParams("category", category.name);
          }}
        >
          {category.name}
        </button>
      );
    });
  }
  function filterProducts() {
    let prods;
    if (
      searchParams.get("category") === null &&
      searchParams.get("min-price") === null
    ) {
      prods = items;
    }
    if (searchParams.get("category") !== null) {
      prods = items.filter(
        (pro) => pro.category === searchParams.get("category"),
      );
    }
    if (searchParams.get("min-price") !== null) {
      prods
        ? (prods = prods.filter(
            (pro) => pro.newPrice >= searchParams.get("min-price"),
          ))
        : (prods = ss.products.filter(
            (pro) => pro.newPrice >= searchParams.get("min-price"),
          ));
    }
    if (searchParams.get("max-price") !== null) {
      prods
        ? (prods = prods.filter(
            (pro) => pro.newPrice <= searchParams.get("max-price"),
          ))
        : (prods = ss.products.filter(
            (pro) => pro.newPrice <= searchParams.get("max-price"),
          ));
    }
    if (searchParams.get("search")) {
      prods
        ? (prods = prods.filter((pro) =>
            pro.title
              .toLowerCase()
              .includes(searchParams.get("search").toLowerCase()),
          ))
        : (prods = ss.products.filter(
            pro.title.includes(searchParams.get("search")),
          ));
    }
    return prods;
  }
  const displayedProducts = filterProducts();
  function CreateProducts() {
    return displayedProducts.map((product) => {
      return (
        <div
          className={
            product.isAvailable
              ? " product-card available"
              : " product-card not-available"
          }
          key={product.id}
        >
          <div className="img">
            <img src={product.image} alt="" className="p-img" />
          </div>
          <div className="p-title">{product.title}</div>
          <div className="price">
            <span className="p-old-price">
              <LuDollarSign />
              {product.oldPrice}
            </span>
            <span className="p-price">
              <LuDollarSign />
              {product.newPrice}
            </span>
          </div>
          <div className="p-category">
            <LuTag />
            {product.category}
          </div>
          {product.isAvailable && (
            <button
              className="add-btn"
              style={{ backgroundColor: "#009688" }}
              id={product.id}
              onClick={() => {
                dispatch(cartActions.addToCart(product));
                toast.success("item Added");
              }}
            >
              <LuShoppingCart />
            </button>
          )}

          <button
            className="remove-btn"
            style={
              cartItems.items.find((item) => item.id == product.id)
                ? { backgroundColor: "#F44336" }
                : { visibility: "hidden" }
            }
            id={product.id}
            onClick={() => {
              dispatch(cartActions.removeFromCart(product));
              toast.success("item removed");
            }}
          >
            <LuTrash2 />
          </button>

          <NavLink id={product.id} to={`${product.id}`} className="det">
            Details
          </NavLink>
        </div>
      );
    });
  }
  return items.length > 0 ? (
    <>
      <div className="search-bar">{createFilters()}</div>
      <div className="cat">
        {createCategories()}
        {searchParams.get("category") !== null ? (
          <button onClick={() => setSearchParams({})}>
            back to all products
          </button>
        ) : null}
      </div>
      <div className="p-cont">{CreateProducts()}</div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  ) : (
    <div className="loading"></div>
  );
}
