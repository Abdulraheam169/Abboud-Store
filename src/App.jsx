import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router";
import PageLayout from "./PageLayout";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const MyCard = lazy(() => import("./pages/MyCard.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const FormPage = lazy(() => import("./pages/FormPage.jsx"));

export default function Market() {
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

  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetch("https://69fd2d9630ad0a6fd1c0867d.mockapi.io/products/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function handleQuantity(id, newQuantity) {
    if (newQuantity < 1) return;

    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
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
  function toggleAdded(productId) {
    setProducts((prev) =>
      prev.map((pro) =>
        pro.id == productId ? { ...pro, isAdded: !pro.isAdded } : pro,
      ),
    );
  }

  // return (
  //   <>
  //     <HashRouter>
  //       <Routes>
  //         <Route path="/" element={<PageLayout />}>
  //           <Route index element={<Home />} />
  //           <Route path="aboutUs" element={<About />} />
  //           <Route
  //             path="myCard"
  //             element={
  //               <MyCard
  //                 items={products.filter((item) => item.isAdded)}
  //                 onChange={handleQuantity}
  //                 remove={toggleAdded}
  //               />
  //             }
  //           />
  //           <Route
  //             path="myCard/form"
  //             element={
  //               <FormPage items={products.filter((item) => item.isAdded)} />
  //             }
  //           />
  //           <Route
  //             path="products"
  //             element={
  //               <Products
  //                 products={products}
  //                 categories={categories}
  //                 toggle={toggleAdded}
  //               />
  //             }
  //           />
  //           <Route
  //             path="products/:id"
  //             element={
  //               <Product
  //                 products={products}
  //                 toggle={toggleAdded}
  //                 onChange={handleQuantity}
  //               />
  //             }
  //           />
  //         </Route>
  //       </Routes>
  //     </HashRouter>
  //   </>
  return (
    <>
      <HashRouter>
        <Suspense fallback={<div className="loading"></div>}>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<Home />} />
              <Route path="aboutUs" element={<About />} />
              <Route
                path="myCard"
                element={
                  <MyCard
                    items={products.filter((item) => item.isAdded)}
                    onChange={handleQuantity}
                    remove={toggleAdded}
                  />
                }
              />
              <Route
                path="myCard/form"
                element={
                  <FormPage items={products.filter((item) => item.isAdded)} />
                }
              />
              <Route
                path="products"
                element={
                  <Products
                    products={products}
                    categories={categories}
                    toggle={toggleAdded}
                  />
                }
              />
              <Route
                path="products/:id"
                element={
                  <Product
                    products={products}
                    toggle={toggleAdded}
                    onChange={handleQuantity}
                  />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}
