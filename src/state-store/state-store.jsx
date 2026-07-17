import React, { Children, useState, useEffect } from "react";
import Products from "../pages/Products";
export const stateStore = React.createContext(null);

export function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  React.useEffect(() => {
    fetch("https://69fd2d9630ad0a6fd1c0867d.mockapi.io/products/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);
  const [categories] = React.useState([
    {
      id: 1,
      name: "Tech",
      description: "Gadgets, gear, and electronics to power your digital life.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E💻%3C/text%3E%3C/svg%3E",
    },
    {
      id: 2,
      name: "Workspace",
      description: "Workspace essentials for productivity and organization.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E🗄️%3C/text%3E%3C/svg%3E",
    },
    {
      id: 3,
      name: "Home Decor",
      description: "Decor and essentials to elevate your living space.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E🪴%3C/text%3E%3C/svg%3E",
    },
    {
      id: 4,
      name: "Library",
      description: "Books and learning materials for your daily routine.",
      image:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E",
    },
  ]);

  React.useEffect(() => {
    setCart(products.filter((item) => item.isAdded));
  }, [products]);

  function handleQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: item.newPrice * newQuantity,
          };
        }
        return item;
      }),
    );
  }

  function toggleAddState(productId) {
    setProducts((prev) =>
      prev.map((pro) =>
        pro.id == productId ? { ...pro, isAdded: !pro.isAdded } : pro,
      ),
    );
  }

  return (
    <stateStore.Provider
      value={{ products, cart, categories, handleQuantity, toggleAddState }}
    >
      {children}
    </stateStore.Provider>
  );
}
