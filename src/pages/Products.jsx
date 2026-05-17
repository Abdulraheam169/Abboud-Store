import React from "react";
import { NavLink, useSearchParams } from "react-router";
import {
  LuShoppingCart,
  LuTrash2,
  LuTag,
  LuDollarSign,
  LuRefreshCw,
} from "react-icons/lu";

export default function Products(prop) {
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
          onChange={() =>
            handleSearchParams(
              "search",
              document.querySelector("#searchName").value,
            )
          }
          placeholder="Search Your Product Here"
        />
        <select
          name="price"
          id="price"
          onClick={() =>
            handleSearchParams(
              "min-price",
              document.querySelector("#price").value,
            )
          }
        >
          <option value={0}>All Products</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={150}>150</option>
          <option value={200}>200</option>
        </select>
        {searchParams.get("search") !== null ||
        searchParams.get("min-price") !== null ? (
          <button
            className="reset-search"
            onClick={() => {
              setSearchParams({});
              document.querySelector("#price").value = 0;
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
    return prop.categories.map((category) => {
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
      prods = prop.products;
    }
    if (searchParams.get("category") !== null) {
      prods = prop.products.filter(
        (pro) => pro.category === searchParams.get("category"),
      );
    }
    if (searchParams.get("min-price") !== null) {
      prods
        ? (prods = prods.filter(
            (pro) => pro.newPrice >= searchParams.get("min-price"),
          ))
        : (prods = prop.products.filter(
            (pro) => pro.newPrice >= searchParams.get("min-price"),
          ));
    }
    if (searchParams.get("search")) {
      prods
        ? (prods = prods.filter((pro) =>
            pro.title
              .toLowerCase()
              .includes(searchParams.get("search").toLowerCase()),
          ))
        : (prods = prop.products.filter(
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
          {product.isAvailable ? (
            <button id={product.id} onClick={prop.toggle}>
              {product.isAdded ? <LuTrash2 /> : <LuShoppingCart />}
            </button>
          ) : undefined}
          <NavLink id={product.id} to={`${product.id}`} className="det">
            go to details
          </NavLink>
        </div>
      );
    });
  }

  return prop.products.length > 0 ? (
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
    </>
  ) : (
    <div className="loading"></div>
  );
}
